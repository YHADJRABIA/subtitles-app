import { connectDB } from '@/lib/mongodb'
import { User } from '@/models/user.model'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { isEmpty, isValidPassword, isValidEmail } from '@/utils/validators'
import { isDevelopment } from '@/utils/general'

connectDB()

const { JWT_SECRET, JWT_EXPIRATION_TIME } = process.env

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { email, password } = reqBody

    // Empty fields
    if (isEmpty(email) || isEmpty(password))
      return NextResponse.json(
        { msg: 'Fill out all fields', success: false },
        { status: 400 }
      )

    // Invalid format
    if (!isValidEmail(email))
      return NextResponse.json(
        { msg: 'Invalid email format', success: false },
        { status: 401 }
      )

    if (!isValidPassword(password))
      return NextResponse.json(
        { msg: 'Invalid password format', success: false },
        { status: 401 }
      )

    const user = await User.findOne({ email })

    // Invalid credentials
    const validPassword = await bcryptjs.compare(password, user.password)
    if (!validPassword || !user) {
      return NextResponse.json(
        { error: 'Incorrect password or email', success: false },
        { status: 400 }
      )
    }

    isDevelopment && console.log(user)

    // Creating token
    const tokenData = { id: user._id, email: user.email }

    const token = await jwt.sign(tokenData, JWT_SECRET!, {
      expiresIn: JWT_EXPIRATION_TIME,
    })

    const response = NextResponse.json({
      message: 'Login successful!',
      success: true,
    })
    response.cookies.set('token', token, {
      httpOnly: true,
    })
    return response
  } catch (error: any) {
    // TODO: fix any
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
