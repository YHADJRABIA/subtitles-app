import React, { ReactNode } from 'react'
import { getTranslations } from 'next-intl/server'
import Header from '@/components/Layout/Header/index'
import Footer from '@/components/Layout/Footer'
import { getUserSession } from '@/utils/session'
import { getNextLocale } from '@/utils/cookies'
import styles from './layout.module.scss'

export const generateMetadata = async () => {
  const locale = getNextLocale()
  const t = await getTranslations({ locale, namespace: 'Metadata.Homepage' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

interface PropTypes {
  children: ReactNode
}
const layout = async ({ children }: PropTypes) => {
  const user = await getUserSession()
  return (
    <>
      <Header isConnected={!!user} />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  )
}

export default layout
