import { getErrorMessage } from '@/utils/errors'
import { getTranslations } from 'next-intl/server'
import { generateVerificationCode } from './code'
import { sendTwoFactorOTPEmail } from '../mail'

export const sendTwoFactorOTP = async (
  userId: string,
  email: string,
  locale: string
) => {
  try {
    const t = await getTranslations({ locale, namespace: 'User' })
    const verificationCode = await generateVerificationCode(email, userId)

    await sendTwoFactorOTPEmail(locale, email, verificationCode.code)

    return {
      data: { message: t('otp_sent'), success: true, requiresUserAction: true },
      status: 200,
    }
  } catch (err) {
    console.error('Error in sendTwoFactorOTP: ', getErrorMessage(err))
    return { data: null, error: getErrorMessage(err), status: 500 }
  }
}
