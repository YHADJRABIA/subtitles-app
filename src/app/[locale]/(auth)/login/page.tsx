import React from 'react'
import AuthForm from '@/components/Auth/AuthForm'
import { Metadata } from 'next/types'
import { getTranslations } from 'next-intl/server'
import { MetaDataProps } from '../../layout'

export const generateMetadata = async ({
  params: { locale },
}: MetaDataProps): Promise<Metadata> => {
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
