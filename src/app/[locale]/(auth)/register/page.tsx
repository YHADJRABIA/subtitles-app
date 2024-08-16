import AuthForm from '@/components/Auth/AuthForm'

import React from 'react'
import { Metadata } from 'next/types'
import { getTranslations } from 'next-intl/server'
import { Locale } from '@/types/locale'

export const generateMetadata = async ({
  params: { locale },
}: {
  params: { locale: Locale }
}): Promise<Metadata> => {
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
