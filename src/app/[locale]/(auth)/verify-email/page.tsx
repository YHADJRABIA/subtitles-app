import VerifyEmail from '@/components/Auth/VerifyEmail'
import React from 'react'
import { Metadata } from 'next/types'
import { getTranslations } from 'next-intl/server'
import { MetaDataProps } from '../../layout'

export const generateMetadata = async ({
  params: { locale },
}: MetaDataProps): Promise<Metadata> => {
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
