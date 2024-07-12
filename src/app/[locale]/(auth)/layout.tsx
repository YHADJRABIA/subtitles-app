import React, { ReactNode } from 'react'
import styles from './layout.module.scss'
import { getTranslations } from 'next-intl/server'
import LanguageMenu from '@/components/Layout/LanguageMenu'
import Logo from '@/components/Layout/Header/Logo'

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
        <div className={styles.top}>
          <Logo size={50} />
          <LanguageMenu />
        </div>

        {children}
      </main>
    </div>
  )
}

export default layout
