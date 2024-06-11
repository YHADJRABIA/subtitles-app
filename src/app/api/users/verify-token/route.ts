import { connectDB } from '@/lib/mongodb'
import { UserModel } from '@/models/user.model'
import { NextRequest, NextResponse } from 'next/server'

import { getErrorMessage, getZodErrors } from '@/utils/errors'
import { getUserByEmail } from '@/utils/db/user'
import { hasExpired } from '@/utils/time'
import {
  deleteVerificationTokenById,
  getVerificationTokenByToken,
} from '@/utils/db/verification-token'
import { getTranslations } from 'next-intl/server'
import { getLocaleFromRequestCookie } from '@/utils/cookies'
import { EmailVerificationValidator } from '@/types/schemas/auth'

connectDB()

export async function POST(req: NextRequest) {
  try {
    const locale = getLocaleFromRequestCookie(req)
    const t = {
      zod: await getTranslations({ locale, namespace: 'Zod' }),
      verifyEmail: await getTranslations({
        locale,
        namespace: 'Auth.VerifyEmail',
      }),
    }

    const rawBody = await req.json()
    const body = EmailVerificationValidator(t.zod).safeParse(rawBody)

    // Form validation
    if (!body.success) {
      const zodErrors = getZodErrors(body.error)
      return NextResponse.json(
        { message: zodErrors.message, success: false },
        { status: 400 }
      )
    }

    const { token } = body.data

    // Look for existing token
    const existingToken = await getVerificationTokenByToken(token)

    // Token doesn't match
    if (!existingToken) {
      return NextResponse.json(
        { message: t.verifyEmail('invalid_token'), success: false },
        { status: 400 }
      )
    }

    // Token has expired
    const tokenHasExpired = hasExpired(existingToken.expires)
    if (tokenHasExpired) {
      return NextResponse.json(
        { message: t.verifyEmail('expired_token'), success: false },
        { status: 400 }
      )
    }

    // Token has no associated user
    const associatedUser = await getUserByEmail(existingToken.email)
    if (!associatedUser) {
      return NextResponse.json(
        { message: t.verifyEmail('user_not_found'), success: false },
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
      message: t.verifyEmail('email_verified'),
      success: true,
    })
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 })
  }
}
