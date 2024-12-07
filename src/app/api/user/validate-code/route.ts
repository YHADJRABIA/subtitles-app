import { connectDB } from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'

import { getErrorMessage, getZodErrors } from '@/utils/errors'

import { getTranslations } from 'next-intl/server'
import { getLocaleFromNextRequest } from '@/utils/cookies'
import {
  getUserByEmail,
  getUserById,
  updateEmailByUserId,
} from '@/utils/db/user'
import {
  deleteVerificationCodeById,
  getVerificationCodeByCode,
} from '@/utils/db/verification-code'
import { hasExpired } from '@/utils/date'
import { EmailVerificationByCodeValidator } from '@/types/schemas/dashboard'
import { getUserSession } from '@/utils/session'

connectDB()

export async function POST(req: NextRequest) {
  try {
    const locale = getLocaleFromNextRequest(req)

    const [t_zod, t] = [
      await getTranslations({ locale, namespace: 'Zod' }),
      await getTranslations({ locale, namespace: 'User' }),
    ]

    const rawBody = await req.json()
    const body = EmailVerificationByCodeValidator(t_zod as any).safeParse(
      rawBody
    )

    // Form validation
    if (!body.success) {
      const zodErrors = getZodErrors(body.error)
      return NextResponse.json(
        { message: zodErrors.message, success: false },
        { status: 400 }
      )
    }

    const { code } = body.data

    const currentUser = await getUserSession()

    // Stop if user isn't authenticated
    if (!currentUser) {
      return NextResponse.json(
        { message: t('unauthorised'), success: false },
        { status: 401 }
      )
    }

    // Look for existing code
    const existingCode = await getVerificationCodeByCode(code)

    // Code doesn't match
    if (!existingCode) {
      return NextResponse.json(
        { message: t('invalid_code'), success: false },
        { status: 400 }
      )
    }

    // Code has expired
    const codeHasExpired = hasExpired(existingCode.expires)
    if (codeHasExpired) {
      return NextResponse.json(
        { message: t('expired_code'), success: false },
        { status: 400 }
      )
    }

    const newEmail = existingCode.email
    const linkedUser = await getUserById(existingCode.userId)

    // Stop validation if user's email isn't linked to code
    const isMatchingEmail = currentUser.email === linkedUser?.email
    if (!linkedUser || !isMatchingEmail) {
      return NextResponse.json(
        { message: t('email_mismatch'), success: false },
        { status: 409 }
      )
    }

    // New email is already taken
    const associatedUser = await getUserByEmail(newEmail)
    if (associatedUser) {
      return NextResponse.json(
        { message: t('email_already_taken'), success: false },
        { status: 409 }
      )
    }

    // Update targeted user's email
    await updateEmailByUserId(existingCode.userId, newEmail)

    // Remove verification code
    await deleteVerificationCodeById(existingCode.id)

    return NextResponse.json({ message: t('user_updated'), success: true })
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 })
  }
}
