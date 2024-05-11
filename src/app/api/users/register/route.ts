import { connectDB } from '@/lib/mongodb'
import { UserModel } from '@/models/user.model'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { isEmpty, isValidPassword, isValidEmail } from '@/utils/validators'
import { isDevelopment } from '@/utils/general'
import { getErrorMessage } from '@/utils/errors'
import { getUserByEmail } from '@/utils/db/user'
import { generateVerificationToken } from '@/lib/auth/token'
import { sendVerificationEmail } from '@/lib/mail'

connectDB()

export async function POST(req: NextRequest) {
  try {
    const nextLocaleCookie = req.cookies.get('NEXT_LOCALE')
    const locale = nextLocaleCookie ? nextLocaleCookie.value : 'en' // TODO: Set defaultLocale in variable

    if (locale === undefined /* || !isLocale(locale) */) {
      return NextResponse.json(
        { message: 'Invalid locale', success: false },
        { status: 400 }
      )
    }
    const reqBody = await req.json()
    const { email, password } = reqBody

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
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new UserModel({
      email: email.toLowerCase(),
      password: hashedPassword,
    })

    const createdUser = await newUser.save()
    isDevelopment && console.warn(createdUser)

    // Generate verification token
    const verificationToken = await generateVerificationToken(email)

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
