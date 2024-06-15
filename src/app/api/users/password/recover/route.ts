import { connectDB } from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'

import { getErrorMessage, getZodErrors } from '@/utils/errors'
import { getUserByEmail } from '@/utils/db/user'

import { getLocaleFromNextRequest } from '@/utils/cookies'
import { sendPasswordResetEmail } from '@/lib/mail'
import { generatePasswordResetToken } from '@/lib/auth/token'
import { PasswordRecoveryValidator } from '@/types/schemas/auth'
import { getTranslations } from 'next-intl/server'

connectDB()

export async function POST(req: NextRequest) {
  try {
    const locale = getLocaleFromNextRequest(req)

    const [t_zod, t] = [
      await getTranslations({ locale, namespace: 'Zod' }),
      await getTranslations({
        locale,
        namespace: 'Auth.PasswordRecovery',
      }),
    ]

    const rawBody = await req.json()
    const body = PasswordRecoveryValidator(t_zod).safeParse(rawBody)

    // Form validation
    if (!body.success) {
      const zodErrors = getZodErrors(body.error)
      return NextResponse.json(
        { message: zodErrors.message, success: false },
        { status: 400 }
      )
    }

    const { email } = body.data

    // Check if user already exists
    const existingUser = await getUserByEmail(email)

    // Should be blurry with response message for security reasons, to not expose database
    // Email doesn't exist
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

    const passwordResetToken = await generatePasswordResetToken(email)

    // Send password-reset email
    await sendPasswordResetEmail(
      locale,
      passwordResetToken.email,
      passwordResetToken.token
    )

    return NextResponse.json({
      message: t('recovery_email_sent'),
      success: true,
    })
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 })
  }
}
