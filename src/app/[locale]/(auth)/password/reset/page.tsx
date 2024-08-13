import PasswordResetForm from '@/components/Auth/Password/PasswordResetForm'
import React from 'react'
import { getNextLocale } from '@/utils/cookies'
import { Metadata } from 'next/types'
import { getTranslations } from 'next-intl/server'

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = getNextLocale()
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: `${t('prefix')} ${t('Auth.PasswordReset.title')}`,
    description: t('Auth.PasswordReset.description'),
  }
}

const PasswordResetPage = () => {
  return <PasswordResetForm />
}

export default PasswordResetPage
