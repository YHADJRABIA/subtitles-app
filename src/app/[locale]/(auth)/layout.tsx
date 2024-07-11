import React, { ReactNode } from 'react'
import styles from './layout.module.scss'
import { getTranslations } from 'next-intl/server'
import LanguageMenu from '@/components/Layout/LanguageMenu'

export const generateMetadata = async () => {
  const t = await getTranslations({ namespace: 'Metadata.Auth' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

interface PropTypes {
  children: ReactNode
}
const layout = ({ children }: PropTypes) => {
  return (
    <div className={styles.root}>
      <main className={styles.main}>
        <LanguageMenu className={styles.languageMenu} />
        {children}
      </main>
    </div>
  )
}

export default layout
