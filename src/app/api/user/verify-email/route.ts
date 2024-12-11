import { connectDB } from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'

import { getErrorMessage, getZodErrors } from '@/utils/errors'

import { getTranslations } from 'next-intl/server'
import { getLocaleFromNextRequest } from '@/utils/cookies'
import { SendEmailUpdateVerificationValidator } from '@/types/schemas/dashboard'
import { getUserSession } from '@/utils/session'
import { verifyEmailByCode } from '@/lib/auth/verifyEmail'
import { APIResponse } from '@/types/api'

connectDB()

export async function POST(
  req: NextRequest
): Promise<NextResponse<APIResponse>> {
  try {
    const locale = getLocaleFromNextRequest(req)

    const [t_zod, t] = [
      await getTranslations({ locale, namespace: 'Zod' }),
      await getTranslations({ locale, namespace: 'User' }),
    ]

    const rawBody = await req.json()
    const body = SendEmailUpdateVerificationValidator(t_zod as any).safeParse(
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

    const { email } = body.data

    const currentUser = await getUserSession()

    // Stop if user isn't authenticated
    if (!currentUser.id) {
      return NextResponse.json(
        { message: t('unauthorised'), success: false },
        { status: 401 }
      )
    }

    const { data, status, error } = await verifyEmailByCode(
      email,
      currentUser.id,
      locale
    )
    if (error) {
      return NextResponse.json({ error, success: false }, { status })
    }
    return NextResponse.json(data, { status })
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 })
  }
}
