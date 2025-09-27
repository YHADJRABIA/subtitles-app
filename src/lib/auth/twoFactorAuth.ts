import { updateTwoFactorAuthByUserId } from '@/utils/db/user'
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
    const verificationCode = await generateVerificationCode(email, userId)

    await sendTwoFactorOTPEmail(locale, email, verificationCode.code)

    return {
      data: { message: 'OTP code sent to your email', success: true },
      status: 200,
    }
  } catch (err) {
    console.error('Error in sendTwoFactorOTP: ', getErrorMessage(err))
    return { data: null, error: getErrorMessage(err), status: 500 }
  }
}

export const toggleTwoFactorAuth = async (
  userId: string,
  isTwoFactorEnabled: boolean,
  locale: string
) => {
  try {
    const t = await getTranslations({ locale, namespace: 'User' })

    await updateTwoFactorAuthByUserId(userId, isTwoFactorEnabled)

    return {
      data: { message: t('two_factor_updated'), success: true },
      status: 200,
    }
  } catch (err) {
    console.error('Error in toggleTwoFactorAuth: ', getErrorMessage(err))
    return { data: null, error: getErrorMessage(err), status: 500 }
  }
}
