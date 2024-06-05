import { connectDB } from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'

import { getErrorMessage, getZodErrors } from '@/utils/errors'
import { getUserByEmail } from '@/utils/db/user'

import { getLocaleFromRequestCookie } from '@/utils/cookies'
import { sendVerificationEmail } from '@/lib/mail'
import { generateVerificationToken } from '@/lib/auth/token'
import { AccountEmailVerificationValidator } from '@/types/schemas/auth'

connectDB()

export async function POST(req: NextRequest) {
  try {
    const locale = getLocaleFromRequestCookie(req)

    const rawBody = await req.json()
    const body = AccountEmailVerificationValidator.safeParse(rawBody)

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
          message: 'User not found',
          success: false,
        },
        { status: 404 }
      )

    // Check if user already active
    const isAlreadyVerified = !!existingUser?.emailVerified
    if (isAlreadyVerified)
      return NextResponse.json(
        {
          message: 'Email is already verified',
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
      message: 'Verification email sent',
      success: true,
    })
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 })
  }
}
