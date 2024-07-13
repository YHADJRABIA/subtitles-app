import React, { ReactNode } from 'react'
import styles from './layout.module.scss'
import { getTranslations } from 'next-intl/server'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'

export const generateMetadata = async () => {
  const t = await getTranslations({ namespace: 'Metadata.Protected' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

interface PropTypes {
  children: ReactNode
}
const ProtectedLayout = ({ children }: PropTypes) => {
  return (
    <>
      <Header isConnected={true} />
      <main className={styles.root}>{children}</main>
      <Footer />
    </>
  )
}

export default ProtectedLayout
