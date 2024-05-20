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
        { message: 'Missing Email', success: false },
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

    // Email doesn't exist – be blurry with response message for security
    if (!existingUser)
      return NextResponse.json({
        message: 'Recovery Email sent, if user exists',
        success: true,
      })

    const passwordResetToken = await generatePasswordResetToken(email)

    // Send verification email
    await sendPasswordResetEmail(
      locale,
      passwordResetToken.email,
      passwordResetToken.token
    )

    return NextResponse.json({
      message: 'Recovery Email sent, if user exists',
      success: true,
    })
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 })
  }
}
