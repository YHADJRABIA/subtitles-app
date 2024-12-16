import { connectDB } from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'

import { getErrorMessage, getZodErrors } from '@/utils/errors'
import { getUserByEmail, verifyEmailByUserId } from '@/utils/db/user'
import { hasExpired } from '@/utils/date'
import {
  deleteVerificationTokenById,
  getVerificationTokenByToken,
} from '@/utils/db/verification-token'
import { getTranslations } from 'next-intl/server'
import { getLocaleFromNextRequest } from '@/utils/cookies'
import { EmailVerificationByTokenValidator } from '@/types/schemas/auth'

connectDB()

export async function POST(req: NextRequest) {
  try {
    const locale = getLocaleFromNextRequest(req)

    const [t_zod, t] = [
      await getTranslations({ locale, namespace: 'Zod' }),
      await getTranslations({ locale, namespace: 'Auth.VerifyEmail' }),
    ]

    const rawBody = await req.json()
    const body = EmailVerificationByTokenValidator(t_zod as any).safeParse(
      rawBody
    )

    // Form validation
    if (!body.success) {
      const zodErrors = getZodErrors(body.error)
      return NextResponse.json(
        { message: zodErrors.message, success: false },
        { status: 400 }
      )
    }

    const { token } = body.data

    // Look for existing token
    const existingToken = await getVerificationTokenByToken(token)

    // Token doesn't match
    if (!existingToken) {
      return NextResponse.json(
        { message: t('invalid_token'), success: false },
        { status: 400 }
      )
    }

    // Token has expired
    const tokenHasExpired = hasExpired(existingToken.expires)
    if (tokenHasExpired) {
      return NextResponse.json(
        { message: t('expired_token'), success: false },
        { status: 400 }
      )
    }

    // Token has no associated user
    const associatedUser = await getUserByEmail(existingToken.email)
    if (!associatedUser) {
      return NextResponse.json(
        { message: t('user_not_found'), success: false },
        { status: 404 }
      )
    }

    // Validate associated user's email by setting current date
    await verifyEmailByUserId(associatedUser.id)

    // Remove verification token
    await deleteVerificationTokenById(existingToken.id)

    return NextResponse.json({ message: t('email_verified'), success: true })
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 })
  }
}
