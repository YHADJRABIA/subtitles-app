import { connectDB } from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'
import { getErrorMessage, getZodErrors } from '@/utils/errors'
import { deleteUserById, getUserById, updateNameById } from '@/utils/db/user'
import { getLocaleFromNextRequest } from '@/utils/cookies'
import { getTranslations } from 'next-intl/server'
import {
  UserDeleteValidator,
  UserUpdateValidator,
} from '@/types/schemas/dashboard'
import { getUserSession } from '@/utils/session'

connectDB()

export async function PUT(req: NextRequest) {
  try {
    const locale = getLocaleFromNextRequest(req)

    const [t_zod, t] = [
      await getTranslations({ locale, namespace: 'Zod' }),
      await getTranslations({ locale, namespace: 'User' }),
    ]

    const rawBody = await req.json()

    const body = UserUpdateValidator(t_zod as any).safeParse(rawBody)

    if (!body.success) {
      const zodErrors = getZodErrors(body.error)
      return NextResponse.json(
        { message: zodErrors.message, success: false },
        { status: 400 }
      )
    }

    const { id, user } = body.data

    // Check if user exists
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

    // Ensure only authenticated users may update their own name
    if (currentUser.id !== id) {
      return NextResponse.json(
        { message: t('unauthorised'), success: false },
        { status: 403 }
      )
    }

    // Update user's name
    await updateNameById(id, user.name) // TODO: update to include more fields

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

    // Check if user exists
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

    // Ensure only the authenticated user can delete own account
    if (user.id !== id) {
      return NextResponse.json(
        { message: t('unauthorised'), success: false },
        { status: 403 }
      )
    }

    // Delete user
    await deleteUserById(id)

    return NextResponse.json({
      message: t('user_deleted'),
      success: true,
    })
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 })
  }
}
