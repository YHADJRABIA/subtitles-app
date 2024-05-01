import { connectDB } from '@/config/db'
import { User } from '@/models/user.model'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { isEmpty, isValidPassword, isValidEmail } from '@/utils/validators'
import { isDevelopment } from '@/utils/general'

connectDB()

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json()
    const { email, password } = reqBody

    // Empty fields
    if (isEmpty(email) || isEmpty(password))
      return NextResponse.json({ msg: 'Fill out all fields' }, { status: 400 })

    // Invalid format
    if (!isValidEmail(email))
      return NextResponse.json({ msg: 'Invalid email' }, { status: 401 })

    if (!isValidPassword(password))
      return NextResponse.json({ msg: 'Invalid password' }, { status: 401 })

    // Check if user already exists
    const existingUser = await User.findOne({ email })

    // Already existing user
    if (existingUser)
      return NextResponse.json(
        { msg: 'Account already exists under given email' },
        { status: 400 }
      )

    // Hash password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
      email,
      password: hashedPassword,
    })

    const createdUser = await newUser.save()
    isDevelopment && console.warn(createdUser)

    // send verification email

    /*     await sendEmail({ email, emailType: 'VERIFY', userId: createdUser._id }) */

    return NextResponse.json({
      message: 'User created successfully',
      success: true,
      savedUser: createdUser,
    })
  } catch (error: any) {
    // TODO: type error properly
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
