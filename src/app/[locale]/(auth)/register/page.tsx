import AuthForm from '@/components/Auth/AuthForm'

import React from 'react'
import { getNextLocale } from '@/utils/cookies'
import { Metadata } from 'next/types'
import { getTranslations } from 'next-intl/server'

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = getNextLocale()
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: `${t('prefix')} ${t('Auth.Register.title')}`,
    description: t('Auth.Register.description'),
  }
}

const RegisterPage = () => {
  return <AuthForm type="register" />
}

export default RegisterPage
