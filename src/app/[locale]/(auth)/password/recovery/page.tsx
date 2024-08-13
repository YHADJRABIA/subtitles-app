import PasswordRecoveryForm from '@/components/Auth/Password/PasswordRecoveryForm'
import React from 'react'
import { getNextLocale } from '@/utils/cookies'
import { Metadata } from 'next/types'
import { getTranslations } from 'next-intl/server'

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = getNextLocale()
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: `${t('prefix')} ${t('Auth.PasswordRecovery.title')}`,
    description: t('Auth.PasswordRecovery.description'),
  }
}
const PasswordRecoveryPage = () => {
  return <PasswordRecoveryForm />
}

export default PasswordRecoveryPage
