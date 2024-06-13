import { connectDB } from '@/lib/mongodb'
import { UserModel } from '@/models/user.model'
import { NextRequest, NextResponse } from 'next/server'

import { getErrorMessage, getZodErrors } from '@/utils/errors'
import { getUserByEmail } from '@/utils/db/user'
import { hasExpired } from '@/utils/time'
import {
  deletePasswordResetTokenById,
  getPasswordResetTokenByToken,
} from '@/utils/db/password-reset-token'
import { hashPassword } from '@/utils/random'
import { getLocaleFromNextRequest } from '@/utils/cookies'
import { getTranslations } from 'next-intl/server'
import { PasswordResetValidator } from '@/types/schemas/auth'

connectDB()

export async function POST(req: NextRequest) {
  try {
    const locale = getLocaleFromNextRequest(req)
    const t = {
      zod: await getTranslations({ locale, namespace: 'Zod' }),
      passwordReset: await getTranslations({
        locale,
        namespace: 'Auth.PasswordReset',
      }),
    }

    const rawBody = await req.json()
    const body = PasswordResetValidator(t.zod).safeParse(rawBody)

    // Form validation
    if (!body.success) {
      const zodErrors = getZodErrors(body.error)
      return NextResponse.json(
        { message: zodErrors.message, success: false },
        { status: 400 }
      )
    }

    const { token, password } = body.data

    // Look for existing token
    const existingToken = await getPasswordResetTokenByToken(token)

    // Token doesn't match
    if (!existingToken) {
      return NextResponse.json(
        { message: t.passwordReset('invalid_token'), success: false },
        { status: 400 }
      )
    }

    // Token has expired
    const tokenHasExpired = hasExpired(existingToken.expires)
    if (tokenHasExpired) {
      return NextResponse.json(
        {
          message: t.passwordReset('expired_token'),
          success: false,
        },
        { status: 400 }
      )
    }

    // Token has no associated user
    const associatedUser = await getUserByEmail(existingToken.email)
    if (!associatedUser) {
      return NextResponse.json(
        { message: t.passwordReset('user_not_found'), success: false },
        { status: 404 }
      )
    }

    // Hash password for safety
    const hashedPassword = await hashPassword(password)

    // Update associated user's password
    await UserModel.updateOne(
      { _id: associatedUser.id },
      { password: hashedPassword }
    )

    // Remove password reset token
    await deletePasswordResetTokenById(existingToken.id)

    return NextResponse.json({
      message: t.passwordReset('password_updated'),
      success: true,
    })
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 })
  }
}
