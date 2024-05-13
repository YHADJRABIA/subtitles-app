import { connectDB } from '@/lib/mongodb'
import { UserModel } from '@/models/user.model'
import { NextRequest, NextResponse } from 'next/server'

import { getErrorMessage } from '@/utils/errors'
import { getUserByEmail } from '@/utils/db/user'
import { hasExpired } from '@/utils/time'
import {
  deletePasswordResetTokenById,
  getPasswordResetTokenByToken,
} from '@/utils/db/password-reset-token'
import { hashPassword } from '@/utils/random'

connectDB()

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json()
    const { token, password } = reqBody

    if (!token) {
      return NextResponse.json(
        { message: 'Missing token', success: false },
        { status: 400 }
      )
    }

    if (!password) {
      return NextResponse.json(
        { message: 'Missing password', success: false },
        { status: 400 }
      )
    }

    // Look for existing token
    const existingToken = await getPasswordResetTokenByToken(token)

    // Token doesn't match
    if (!existingToken) {
      return NextResponse.json(
        { message: 'Invalid token. Reset password again', success: false },
        { status: 400 }
      )
    }

    // Token has expired
    const tokenHasExpired = hasExpired(existingToken.expires)
    if (tokenHasExpired) {
      return NextResponse.json(
        { message: 'Token has expired', success: false },
        { status: 400 }
      )
    }

    // Token has no associated user
    const associatedUser = await getUserByEmail(existingToken.email)
    if (!associatedUser) {
      return NextResponse.json(
        { message: 'User not found', success: false },
        { status: 404 }
      )
    }

    // Hash password for safety
    const hashedPassword = hashPassword(password)

    // Update associated user's password
    await UserModel.updateOne(
      { _id: associatedUser.id },
      { password: hashedPassword }
    )

    // Remove password reset token
    await deletePasswordResetTokenById(existingToken.id)

    return NextResponse.json({
      message: 'Password successfully updated!',
      success: true,
    })
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 })
  }
}
