import React from 'react'
import AuthForm from '@/components/Auth/AuthForm'
import { getNextLocale } from '@/utils/cookies'
import { Metadata } from 'next/types'
import { getTranslations } from 'next-intl/server'

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = getNextLocale()
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: `${t('prefix')} ${t('Auth.Login.title')}`,
    description: t('Auth.Login.description'),
  }
}

const LoginPage = () => {
  return <AuthForm type="login" />
}

export default LoginPage
