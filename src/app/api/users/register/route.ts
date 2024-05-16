import { connectDB } from '@/lib/mongodb'
import { UserModel } from '@/models/user.model'
import { NextRequest, NextResponse } from 'next/server'
import { isEmpty, isValidPassword, isValidEmail } from '@/utils/validators'
import { isDevelopment } from '@/utils/general'
import { getErrorMessage } from '@/utils/errors'
import { getUserByEmail } from '@/utils/db/user'
import { generateVerificationToken } from '@/lib/auth/token'
import { sendVerificationEmail } from '@/lib/mail'
import * as z from 'zod'
import { loginSchema } from '@/types/schemas'
import { hashPassword } from '@/utils/random'
import { getLocaleFromRequestCookie } from '@/utils/cookies'

connectDB()

export async function POST(req: NextRequest) {
  try {
    const locale = getLocaleFromRequestCookie(req)

    const reqBody = await req.json()
    const { email, password }: z.infer<typeof loginSchema> = reqBody

    // Empty fields
    if (isEmpty(email) || isEmpty(password))
      return NextResponse.json(
        { message: 'Missing fields', success: false },
        { status: 400 }
      )

    // Invalid format
    if (!isValidEmail(email))
      return NextResponse.json(
        { message: 'Invalid email format', success: false },
        { status: 401 }
      )

    if (!isValidPassword(password))
      return NextResponse.json(
        { message: 'Invalid password format', success: false },
        { status: 401 }
      )

    // Check if user already exists
    const existingUser = await getUserByEmail(email)

    // Already existing user
    if (existingUser)
      return NextResponse.json(
        { message: 'Email already exists', success: false },
        { status: 400 }
      )

    // Hash password for safety
    const hashedPassword = await hashPassword(password)

    const newUser = new UserModel({
      email: email.toLowerCase(),
      password: hashedPassword,
    })

    const createdUser = await newUser.save()
    isDevelopment && console.warn(createdUser)

    // Generate verification token
    const verificationToken = await generateVerificationToken(
      email.toLowerCase()
    )

    // Send verification email
    await sendVerificationEmail(
      locale,
      email.toLowerCase(),
      verificationToken.token
    )

    return NextResponse.json({
      message: 'Account successfully created!',
      success: true,
      savedUser: createdUser,
    })
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 })
  }
}
