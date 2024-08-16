import PasswordRecoveryForm from '@/components/Auth/Password/PasswordRecoveryForm'
import React from 'react'
import { Metadata } from 'next/types'
import { getTranslations } from 'next-intl/server'
import { MetaDataProps } from '@/app/[locale]/layout'

export const generateMetadata = async ({
  params: { locale },
}: MetaDataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: `${t('prefix')} ${t('Auth.PasswordRecovery.title')}`,
    description: t('Auth.PasswordRecovery.description'),
  }
}
const PasswordRecoveryPage = () => {
  return <PasswordRecoveryForm />
}

export default PasswordRecoveryPage
