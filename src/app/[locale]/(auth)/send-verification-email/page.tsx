import SendVerificationEmailForm from '@/components/Auth/SendVerificationEmailForm'
import React from 'react'
import { Metadata } from 'next/types'
import { getTranslations } from 'next-intl/server'
import { MetaDataProps } from '../../layout'

export const generateMetadata = async ({
  params: { locale },
}: MetaDataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: `${t('prefix')} ${t('Auth.SendVerificationEmail.title')}`,
    description: t('Auth.SendVerificationEmail.description'),
  }
}

const SendVerificationEmailPage = () => {
  return <SendVerificationEmailForm />
}

export default SendVerificationEmailPage
