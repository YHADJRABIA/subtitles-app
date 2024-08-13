import SendVerificationEmailForm from '@/components/Auth/SendVerificationEmailForm'
import React from 'react'
import { getNextLocale } from '@/utils/cookies'
import { Metadata } from 'next/types'
import { getTranslations } from 'next-intl/server'

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = getNextLocale()
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
