import { connectDB } from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'
import { getErrorMessage, getZodErrors } from '@/utils/errors'
import { getUserByEmail } from '@/utils/db/user'
import { getTranslations } from 'next-intl/server'
import { getLocaleFromNextRequest } from '@/utils/cookies'
import { SendEmailVerificationValidator } from '@/types/schemas/general'
import { sendTwoFactorOTP } from '@/lib/auth/twoFactorAuth'
import { getTwoFactorTokenByEmail } from '@/utils/db/two-factor-token'
import { getAgeInSecondsFromExpiry } from '@/utils/date'

const RESEND_COOLDOWN_SECONDS = 30
const TOKEN_LIFETIME_MINUTES = Number(
  process.env.EMAIL_VERIFICATION_CODE_LIFETIME_MINUTES || 15
)

connectDB()

export async function POST(req: NextRequest) {
  try {
    const locale = getLocaleFromNextRequest(req)

    const [t_zod, t] = [
      await getTranslations({ locale, namespace: 'Zod' }),
      await getTranslations({ locale, namespace: 'General' }),
    ]

    const rawBody = await req.json()
    const body = SendEmailVerificationValidator(t_zod).safeParse(rawBody)

    // Form validation
    if (!body.success) {
      const zodErrors = getZodErrors(body.error)
      return NextResponse.json(
        { message: zodErrors.message, success: false },
        { status: 400 }
      )
    }

    const { email } = body.data

    // Check if user exists
    const existingUser = await getUserByEmail(email)
    if (!existingUser) {
      return NextResponse.json(
        { message: t('something_went_wrong'), success: false },
        { status: 404 }
      )
    }

    // Check for existing token and enforce rate limiting
    const existingToken = await getTwoFactorTokenByEmail(email)
    if (existingToken) {
      const tokenAgeInSeconds = getAgeInSecondsFromExpiry(
        existingToken.expires,
        TOKEN_LIFETIME_MINUTES
      )

      if (tokenAgeInSeconds < RESEND_COOLDOWN_SECONDS) {
        return NextResponse.json(
          { message: t('too_many_requests'), success: false },
          { status: 429 }
        )
      }
    }

    // Send new 2FA code
    const result = await sendTwoFactorOTP(existingUser.id, email, locale)

    if (result.error) {
      return NextResponse.json(
        { message: result.error, success: false },
        { status: result.status }
      )
    }

    return NextResponse.json(result.data, { status: result.status })
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 })
  }
}
