import React, { ReactNode } from 'react'
import styles from './layout.module.scss'
import { getTranslations } from 'next-intl/server'
import LanguageMenu from '@/components/Layout/LanguageMenu'
import Logo from '@/components/Layout/Header/Logo'
import { Metadata } from 'next'
import { MetaDataProps } from '../layout'

export const generateMetadata = async ({
  params: { locale },
}: MetaDataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: { template: `${t('prefix')} %s`, default: t('Auth.title') },
    description: t('Auth.description'),
  }
}

interface PropTypes {
  children: ReactNode
}
const layout = ({ children }: PropTypes) => {
  return (
    <div className={styles.root}>
      <main className={styles.main}>
        <div className={styles.topElements}>
          <Logo size={50} />
          <LanguageMenu className={styles.languageMenu} />
        </div>
        {children}
      </main>
    </div>
  )
}

export default layout
