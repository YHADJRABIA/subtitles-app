import { connectDB } from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'

import { getErrorMessage } from '@/utils/errors'
import { getUserByEmail } from '@/utils/db/user'

import { getLocaleFromRequestCookie } from '@/utils/cookies'
import { isEmpty, isValidEmail } from '@/utils/validators'
import { sendVerificationEmail } from '@/lib/mail'
import { generateVerificationToken } from '@/lib/auth/token'

connectDB()

export async function POST(req: NextRequest) {
  try {
    const locale = getLocaleFromRequestCookie(req)

    const reqBody = await req.json()
    const { email } = reqBody

    // Empty fields
    if (isEmpty(email))
      return NextResponse.json(
        { message: 'Missing email', success: false },
        { status: 400 }
      )

    // Invalid format
    if (!isValidEmail(email))
      return NextResponse.json(
        { message: 'Invalid email format', success: false },
        { status: 400 }
      )

    // Check if user already exists
    const existingUser = await getUserByEmail(email)

    // For security reasons, reponses should be blurry as to not expose database

    // Email doesn't exist
    if (!existingUser)
      return NextResponse.json(
        {
          message: 'User not found',
          success: true,
        },
        { status: 404 }
      )

    // Check if user already active
    const isAlreadyVerified = !!existingUser?.emailVerified
    if (isAlreadyVerified)
      return NextResponse.json(
        {
          message: 'Email is already verified',
          success: true,
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
