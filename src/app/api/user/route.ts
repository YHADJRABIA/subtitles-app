import { connectDB } from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'

import { getErrorMessage, getZodErrors } from '@/utils/errors'
import { deleteUserById, getUserById } from '@/utils/db/user'

import { getLocaleFromNextRequest } from '@/utils/cookies'

import { getTranslations } from 'next-intl/server'
import { UserDeleteValidator } from '@/types/schemas/dashboard'

connectDB()

export async function DELETE(req: NextRequest) {
  const rawSearchParams = req.nextUrl.searchParams.get('id')

  try {
    const locale = getLocaleFromNextRequest(req)

    const [t_zod, t] = [
      await getTranslations({ locale, namespace: 'Zod' }),
      await getTranslations({ locale, namespace: 'User' }),
    ]
    // Check for permission to delete user

    const searchParams = UserDeleteValidator(t_zod).safeParse(rawSearchParams)

    // Form validation
    if (!searchParams.success) {
      const zodErrors = getZodErrors(searchParams.error)
      return NextResponse.json(
        { message: zodErrors.message, success: false },
        { status: 400 }
      )
    }

    const id = searchParams.data

    // Check if user exists under this id
    const existingUser = await getUserById(id)

    // Nothing to delete
    if (!existingUser)
      return NextResponse.json(
        {
          message: t('user_not_found'),
          success: false,
        },
        {
          status: 404,
        }
      )

    // Delete user // TODO uncomment after finishing authorisation
    /*     await deleteUserById(id) */

    return NextResponse.json({
      message: t('user_deleted'),
      success: true,
    })
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 })
  }
}
