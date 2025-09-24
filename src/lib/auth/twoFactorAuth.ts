import { updateTwoFactorAuthByUserId } from '@/utils/db/user'
import { getErrorMessage } from '@/utils/errors'
import { getTranslations } from 'next-intl/server'

export const toggleTwoFactorAuth = async (
  userId: string,
  isTwoFactorEnabled: boolean,
  locale: string
) => {
  try {
    const t = await getTranslations({ locale, namespace: 'User' })

    await updateTwoFactorAuthByUserId(userId, isTwoFactorEnabled)

    return {
      requiresUserAction: true,
      data: { message: t('two_factor_updated'), success: true },
      status: 200,
    }
  } catch (err) {
    console.error('Error in toggleTwoFactorAuth: ', getErrorMessage(err))
    return { data: null, error: getErrorMessage(err), status: 500 }
  }
}
