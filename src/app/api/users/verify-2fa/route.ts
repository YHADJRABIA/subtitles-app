import { connectDB } from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'
import { getErrorMessage, getZodErrors } from '@/utils/errors'
import { getUserByEmail } from '@/utils/db/user'
import { hasExpired } from '@/utils/date'
import {
  getTwoFactorTokenByEmailAndCode,
  deleteTwoFactorTokenById,
} from '@/utils/db/two-factor-token'
import { getTranslations } from 'next-intl/server'
import { getLocaleFromNextRequest } from '@/utils/cookies'
import { TwoFactorVerificationValidator } from '@/types/schemas/auth'

connectDB()

export async function POST(req: NextRequest) {
  try {
    const locale = getLocaleFromNextRequest(req)

    const [t_zod, t] = [
      await getTranslations({ locale, namespace: 'Zod' }),
      await getTranslations({ locale, namespace: 'Auth.2FA' }),
    ]

    const rawBody = await req.json()
    const body = TwoFactorVerificationValidator(t_zod).safeParse(rawBody)

    // Form validation
    if (!body.success) {
      const zodErrors = getZodErrors(body.error)
      return NextResponse.json(
        { message: zodErrors.message, success: false },
        { status: 400 }
      )
    }

    const { email, code } = body.data

    const existingToken = await getTwoFactorTokenByEmailAndCode(email, code)

    // Token doesn't match
    if (!existingToken) {
      return NextResponse.json(
        { message: t('invalid_code'), success: false },
        { status: 400 }
      )
    }

    // Token has expired
    const tokenHasExpired = hasExpired(existingToken.expires)
    if (tokenHasExpired) {
      return NextResponse.json(
        { message: t('expired_code'), success: false },
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

    await deleteTwoFactorTokenById(existingToken.id)

    return NextResponse.json({ message: t('verified'), success: true })
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 })
  }
}
