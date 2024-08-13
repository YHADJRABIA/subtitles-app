import VerifyEmail from '@/components/Auth/VerifyEmail'
import React from 'react'
import { getNextLocale } from '@/utils/cookies'
import { Metadata } from 'next/types'
import { getTranslations } from 'next-intl/server'

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = getNextLocale()
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: `${t('prefix')} ${t('Auth.VerifyEmail.title')}`,
    description: t('Auth.VerifyEmail.description'),
  }
}

const VerifyEmailPage = () => {
  return <VerifyEmail />
}

export default VerifyEmailPage
