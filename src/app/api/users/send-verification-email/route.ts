import { connectDB } from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'

import { getErrorMessage, getZodErrors } from '@/utils/errors'
import { getUserByEmail } from '@/utils/db/user'

import { getLocaleFromRequestCookie } from '@/utils/cookies'
import { sendVerificationEmail } from '@/lib/mail'
import { generateVerificationToken } from '@/lib/auth/token'
import { SendEmailVerificationValidator } from '@/types/schemas/auth'
import { getTranslations } from 'next-intl/server'

connectDB()

export async function POST(req: NextRequest) {
  try {
    const locale = getLocaleFromRequestCookie(req)
    const t = {
      zod: await getTranslations({ locale, namespace: 'Zod' }),
      sendVerificationEmail: await getTranslations({
        locale,
        namespace: 'Auth.SendVerificationEmail',
      }),
    }

    const rawBody = await req.json()
    const body = SendEmailVerificationValidator(t.zod).safeParse(rawBody)

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

    // For security reasons, reponses should be blurry as to not expose database

    // Email doesn't exist
    if (!existingUser)
      return NextResponse.json(
        {
          message: t.sendVerificationEmail('user_not_found'),
          success: false,
        },
        { status: 404 }
      )

    // Check if user already active
    const isAlreadyVerified = !!existingUser?.emailVerified
    if (isAlreadyVerified)
      return NextResponse.json(
        {
          message: t.sendVerificationEmail('email_already_verified'),
          success: false,
        },
        { status: 400 }
      )

    const verificationToken = await generateVerificationToken(email)

    // Send password-reset email
    await sendVerificationEmail(
      locale,
      verificationToken.email,
      verificationToken.token
    )

    return NextResponse.json({
      message: t.sendVerificationEmail('verification_email_sent'),
      success: true,
    })
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 })
  }
}
