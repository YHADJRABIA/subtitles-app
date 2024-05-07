import { connectDB } from '@/lib/mongodb'
import { UserModel } from '@/models/user.model'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { isEmpty, isValidPassword, isValidEmail } from '@/utils/validators'
import { isDevelopment } from '@/utils/general'
import { getErrorMessage } from '@/utils/errors'
import { getUserByEmail } from '@/utils/mongoose'

connectDB()

export async function POST(req: NextRequest) {
  try {
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

    // Hash password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new UserModel({
      email,
      password: hashedPassword,
    })

    const createdUser = await newUser.save()
    isDevelopment && console.warn(createdUser)

    // send verification email

    /*     await sendEmail({ email, emailType: 'VERIFY', userId: createdUser._id }) */

    return NextResponse.json({
      message: 'Account successfully created!',
      success: true,
      savedUser: createdUser,
    })
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 })
  }
}
