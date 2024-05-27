import { connectDB } from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'

import { getErrorMessage } from '@/utils/errors'
import { getUserByEmail } from '@/utils/db/user'

import { getLocaleFromRequestCookie } from '@/utils/cookies'
import { isEmpty, isValidEmail } from '@/utils/validators'
import { sendPasswordResetEmail } from '@/lib/mail'
import { generatePasswordResetToken } from '@/lib/auth/token'

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

    // Should be blurry with response message for security reasons, to not expose database
    // Email doesn't exist
    if (!existingUser)
      return NextResponse.json(
        {
          message: 'User not found',
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
      message: 'Recovery email sent',
      success: true,
    })
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 })
  }
}
