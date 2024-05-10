import { connectDB } from '@/lib/mongodb'
import { UserModel } from '@/models/user.model'
import { NextRequest, NextResponse } from 'next/server'

import { getErrorMessage } from '@/utils/errors'
import { getUserByEmail } from '@/utils/db/user'
import { hasExpired } from '@/utils/time'
import {
  deleteVerificationTokenById,
  getVerificationTokenByToken,
} from '@/utils/db/verification-token'

connectDB()

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json()
    const { token } = reqBody

    // Look for existing token
    const existingToken = await getVerificationTokenByToken(token)

    // Token doesn't match
    if (!existingToken) {
      return NextResponse.json(
        { message: 'Invalid token', success: false },
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

    // Validate associated user's email by setting current date
    await UserModel.updateOne(
      { _id: associatedUser.id },
      { emailVerified: new Date() }
    )

    // Remove verification token
    await deleteVerificationTokenById(existingToken.id)

    return NextResponse.json({
      message: 'Email successfully Verified!',
      success: true,
    })
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 })
  }
}
