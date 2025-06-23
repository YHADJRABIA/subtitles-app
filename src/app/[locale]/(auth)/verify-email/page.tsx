import VerifyEmail from '@/components/Auth/VerifyEmail'
import React from 'react'
import { Metadata } from 'next/types'
import { getTranslations } from 'next-intl/server'
import { MetaDataProps } from '../../layout'

export const generateMetadata = async (props: MetaDataProps): Promise<Metadata> => {
  const params = await props.params;

  const {
    locale
  } = params;

  const t = await getTranslations({
    locale,
    namespace: 'Metadata.Auth.VerifyEmail',
  })

  return {
    title: t('title'),
    description: t('description'),
  }
}

const VerifyEmailPage = () => {
  return <VerifyEmail />
}

export default VerifyEmailPage
