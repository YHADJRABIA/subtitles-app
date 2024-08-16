import PasswordResetForm from '@/components/Auth/Password/PasswordResetForm'
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
    title: `${t('prefix')} ${t('Auth.PasswordReset.title')}`,
    description: t('Auth.PasswordReset.description'),
  }
}

const PasswordResetPage = () => {
  return <PasswordResetForm />
}

export default PasswordResetPage
