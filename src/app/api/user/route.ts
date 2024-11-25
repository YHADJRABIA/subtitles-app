import { connectDB } from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'
import { getErrorMessage, getZodErrors } from '@/utils/errors'
import {
  deleteUserById,
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

    // Prevent PATCH of restricted fields
    const hasRestrictedFields = Object.keys(user).some(field =>
      restrictedUserFields.includes(field)
    )

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
