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

connectDB()

export async function POST(req: NextRequest) {
  try {
    const locale = getLocaleFromNextRequest(req)
    const t = {
      zod: await getTranslations({ locale, namespace: 'Zod' }),
      register: await getTranslations({ locale, namespace: 'Auth.Register' }),
    }

    const rawBody = await req.json()
    const body = AccountRegistrationValidator(t.zod).safeParse(rawBody)

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
        { message: t.register('email_already_exists'), success: false },
        { status: 400 }
      )

    // Hash password for safety
    const hashedPassword = await hashPassword(password)

    const newUser = new UserModel({
      email,
      password: hashedPassword,
    })

    const createdUser = await newUser.save()
    isDevelopment && console.warn(createdUser)

    // Generate verification token
    const verificationToken = await generateVerificationToken(email)

    // Send verification email
    await sendVerificationEmail(locale, email, verificationToken.token)

    return NextResponse.json(
      {
        message: t.register('account_created'),
        success: true,
        savedUser: createdUser,
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 })
  }
}
