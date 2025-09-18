import React from 'react'
import AuthForm from '@/components/Auth/AuthForm'
import { Metadata } from 'next/types'
import { getTranslations } from 'next-intl/server'
import { MetaDataProps } from '../../layout'

export const generateMetadata = async ({
  params,
}: MetaDataProps): Promise<Metadata> => {
  const { locale } = await params

  const t = await getTranslations({ locale, namespace: 'Metadata.Auth.Login' })

  return { title: t('title'), description: t('description') }
}

const LoginPage = () => {
  return <AuthForm type="login" />
}

export default LoginPage
