import { connectDB } from '@/lib/mongodb'
import { UserModel } from '@/models/user.model'
import { NextRequest, NextResponse } from 'next/server'
import { isDevelopment } from '@/utils/general'
import { getErrorMessage, getZodErrors } from '@/utils/errors'
import { getUserByEmail } from '@/utils/db/user'
import { generateVerificationToken } from '@/lib/auth/token'
import { sendVerificationEmail } from '@/lib/mail'
import { hashPassword } from '@/utils/random'
import { getLocaleFromNextRequest } from '@/utils/cookies'
import { AccountRegistrationValidator } from '@/types/schemas/auth'
import { getTranslations } from 'next-intl/server'
import { APIResponse } from '@/types/api'

connectDB()

export async function POST(
  req: NextRequest
): Promise<NextResponse<APIResponse>> {
  try {
    const locale = getLocaleFromNextRequest(req)

    const [t_zod, t] = [
      await getTranslations({ locale, namespace: 'Zod' }),
      await getTranslations({ locale, namespace: 'Auth.Register' }),
    ]

    const rawBody = await req.json()
    const body = AccountRegistrationValidator(t_zod).safeParse(rawBody)

    // Form validation
    if (!body.success) {
      const zodErrors = getZodErrors(body.error)
      return NextResponse.json(
        { message: zodErrors.message, success: false },
        { status: 400 }
      )
    }

    const { email, password } = body.data

    // Check if user already exists
    const existingUser = await getUserByEmail(email)

    // Already existing user
    if (existingUser)
      return NextResponse.json(
        { message: t('email_already_taken'), success: false },
        { status: 409 }
      )

    // Hash password for safety
    const hashedPassword = await hashPassword(password)

    const newUser = new UserModel({
      email,
      favoriteLocale: locale,
      password: hashedPassword,
    })

    const createdUser = await newUser.save()
    if (isDevelopment) console.warn(createdUser)

    // Generate verification token
    const verificationToken = await generateVerificationToken(email)

    // Send verification email
    await sendVerificationEmail(locale, email, verificationToken.token)

    return NextResponse.json(
      {
        message: t('account_created'),
        success: true,
        savedUser: createdUser,
        requiresUserAction: true,
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 })
  }
}
