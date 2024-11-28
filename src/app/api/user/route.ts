import { connectDB } from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'
import { getErrorMessage, getZodErrors } from '@/utils/errors'
import {
  deleteUserById,
  getUserByEmail,
  getUserById,
  restrictedUserFields,
  updateUserById,
} from '@/utils/db/user'
import { getLocaleFromNextRequest } from '@/utils/cookies'
import { getTranslations } from 'next-intl/server'
import {
  UserDeleteValidator,
  DashboardUserValidator,
} from '@/types/schemas/dashboard'
import { getUserSession } from '@/utils/session'
import { generateVerificationCode } from '@/lib/auth/code'
import { sendEmailUpdateEmail } from '@/lib/mail'

connectDB()

export async function PATCH(req: NextRequest) {
  try {
    const locale = getLocaleFromNextRequest(req)

    const [t_zod, t] = [
      await getTranslations({ locale, namespace: 'Zod' }),
      await getTranslations({ locale, namespace: 'User' }),
    ]

    const rawBody = await req.json()

    const body = DashboardUserValidator(t_zod as any).safeParse(rawBody)

    if (!body.success) {
      const zodErrors = getZodErrors(body.error)
      return NextResponse.json(
        { message: zodErrors.message, success: false },
        { status: 400 }
      )
    }

    const { id, user } = body.data

    // Check if user exists in DB
    const existingUser = await getUserById(id)
    if (!existingUser) {
      return NextResponse.json(
        { message: t('user_not_found'), success: false },
        { status: 404 }
      )
    }

    // Verify user's identity
    const currentUser = await getUserSession()
    if (!currentUser) {
      return NextResponse.json(
        { message: t('unauthorised'), success: false },
        { status: 401 }
      )
    }

    // Users may edit own data only
    if (currentUser.id !== id) {
      return NextResponse.json(
        { message: t('unauthorised'), success: false },
        { status: 403 }
      )
    }

    const userFields = Object.keys(user)

    // Prevent PATCH of restricted fields
    const hasRestrictedFields = userFields.some(field =>
      restrictedUserFields.includes(field)
    )

    const hasEmail = userFields.includes('email')

    const newEmail = user.email!

    // User attempts to update e-mail
    if (hasEmail) {
      // Check if e-mail isn't already taken
      const existingEmail = !!(await getUserByEmail(newEmail))

      if (existingEmail) {
        return NextResponse.json(
          { message: t('email_already_taken'), success: false },
          { status: 400 }
        )
      }
    }

    // Sensitive data may not be edited
    if (hasRestrictedFields) {
      return NextResponse.json(
        { message: t('unauthorised'), success: false },
        { status: 403 }
      )
    }

    // Update user with allowed fields
    const updatedUser = await updateUserById(id, user)

    if (!updatedUser) {
      return NextResponse.json(
        { message: t('failed_action'), success: false },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: t('user_updated'),
      success: true,
    })
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const rawSearchParams = req.nextUrl.searchParams.get('id') ?? ''

  try {
    const locale = getLocaleFromNextRequest(req)
    const [t_zod, t] = [
      await getTranslations({ locale, namespace: 'Zod' }),
      await getTranslations({ locale, namespace: 'User' }),
    ]

    // Validate request params
    const searchParams = UserDeleteValidator(t_zod as any).safeParse(
      rawSearchParams
    )

    if (!searchParams.success) {
      const zodErrors = getZodErrors(searchParams.error)
      return NextResponse.json(
        { message: zodErrors.message, success: false },
        { status: 400 }
      )
    }

    const id = searchParams.data

    // Check if user exists in DB
    const existingUser = await getUserById(id)
    if (!existingUser) {
      return NextResponse.json(
        { message: t('user_not_found'), success: false },
        { status: 404 }
      )
    }

    // Verify user's identity
    const user = await getUserSession()

    // User not authenticated
    if (!user) {
      return NextResponse.json(
        { message: t('unauthorised'), success: false },
        { status: 401 }
      )
    }

    // Users may delete own account only
    if (user.id !== id) {
      return NextResponse.json(
        { message: t('unauthorised'), success: false },
        { status: 403 }
      )
    }

    const deletedUser = await deleteUserById(id)

    if (!deletedUser) {
      return NextResponse.json(
        { message: t('failed_action'), success: false },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: t('user_deleted'),
      success: true,
    })
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 })
  }
}
