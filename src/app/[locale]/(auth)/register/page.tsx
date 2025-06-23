import AuthForm from '@/components/Auth/AuthForm'

import React from 'react'
import { Metadata } from 'next/types'
import { getTranslations } from 'next-intl/server'
import { Locale } from '@/types/locale'

export const generateMetadata = async (
  props: {
    params: Promise<{ locale: Locale }>
  }
): Promise<Metadata> => {
  const params = await props.params;

  const {
    locale
  } = params;

  const t = await getTranslations({
    locale,
    namespace: 'Metadata.Auth.Register',
  })

  return {
    title: t('title'),
    description: t('description'),
  }
}

const RegisterPage = () => {
  return <AuthForm type="register" />
}

export default RegisterPage
