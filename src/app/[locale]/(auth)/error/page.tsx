import { useTranslations } from 'next-intl'
import React from 'react'

const AuthErrorPage = () => {
  const t = useTranslations('Auth.Error')
  return <div>{t('title')}</div> // TODO finish up
}

export default AuthErrorPage
