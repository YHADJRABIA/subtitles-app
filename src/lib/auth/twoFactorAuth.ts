import { getErrorMessage } from '@/utils/errors'
import { getTranslations } from 'next-intl/server'
import { sendTwoFactorOTPEmail } from '../mail'
import { generateTwoFactorToken } from './token'

export const sendTwoFactorOTP = async (
  userId: string,
  email: string,
  locale: string
) => {
  try {
    const t = await getTranslations({ locale, namespace: 'User' })
    const twoFactorToken = await generateTwoFactorToken(email)

    await sendTwoFactorOTPEmail(locale, email, twoFactorToken.token)

    return {
      data: { message: t('otp_sent'), success: true, requiresUserAction: true },
      status: 200,
    }
  } catch (err) {
    console.error('Error in sendTwoFactorOTP: ', getErrorMessage(err))
    return { data: null, error: getErrorMessage(err), status: 500 }
  }
}
