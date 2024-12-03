import { connectDB } from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'

import { getErrorMessage, getZodErrors } from '@/utils/errors'

import { getTranslations } from 'next-intl/server'
import { getLocaleFromNextRequest } from '@/utils/cookies'
import { SendEmailVerificationValidator } from '@/types/schemas/auth'
import { getUserByEmail } from '@/utils/db/user'
import { sendEmailUpdateEmail } from '@/lib/mail'
import { generateVerificationCode } from '@/lib/auth/code'

connectDB()

export async function POST(req: NextRequest) {
  try {
    const locale = getLocaleFromNextRequest(req)

    const [t_zod, t] = [
      await getTranslations({ locale, namespace: 'Zod' }),
      await getTranslations({ locale, namespace: 'User' }),
    ]

    const rawBody = await req.json()
    const body = SendEmailVerificationValidator(t_zod as any).safeParse(rawBody)

    // Form validation
    if (!body.success) {
      const zodErrors = getZodErrors(body.error)
      return NextResponse.json(
        { message: zodErrors.message, success: false },
        { status: 400 }
      )
    }

    const { email } = body.data

    const existingEmail = !!(await getUserByEmail(email))

    if (existingEmail) {
      return NextResponse.json(
        { message: t('email_already_taken'), success: false },
        { status: 409 }
      )
    }

    // Send code to new e-mail address
    const verificationCode = await generateVerificationCode(email)

    await sendEmailUpdateEmail(locale, email, verificationCode.code)

    return NextResponse.json(
      {
        message: t('verification_email_sent'),
        success: true,
        openModal: true,
        // TODO: Add cooldown to retry
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 })
  }
}
