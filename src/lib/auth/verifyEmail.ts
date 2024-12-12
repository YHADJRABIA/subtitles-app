import { getUserByEmail } from '@/utils/db/user'
import { generateVerificationCode } from './code'
import { sendEmailUpdateEmail } from '../mail'
import { getTranslations } from 'next-intl/server'
import { getErrorMessage } from '@/utils/errors'

export const verifyEmailByCode = async (
  email: string,
  userId: string,
  locale: string
) => {
  try {
    const t = await getTranslations({ locale, namespace: 'User' })

    const existingEmail = !!(await getUserByEmail(email))

    if (existingEmail) {
      return {
        data: {
          message: t('email_already_taken'),
          success: false,
        },
        status: 409,
      }
    }

    // Generate verification code and send email
    const verificationCode = await generateVerificationCode(email, userId)
    await sendEmailUpdateEmail(locale, email, verificationCode.code)

    return {
      openModal: true,
      data: {
        message: t('verification_email_sent'),
        success: true,
      },
      status: 200,
    }
  } catch (err) {
    console.error('Error in verifyEmailByCode:', getErrorMessage(err))
    return {
      data: null,
      error: getErrorMessage(err),
      status: 500,
    }
  }
}
