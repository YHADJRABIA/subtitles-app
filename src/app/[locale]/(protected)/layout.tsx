import React, { ReactNode } from 'react'
import styles from './layout.module.scss'
import { getTranslations } from 'next-intl/server'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import Navbar from './_components/Navbar'
import { getNextLocale } from '@/utils/cookies'
import { Metadata } from 'next'

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = getNextLocale()
  const t = await getTranslations({ locale, namespace: 'Metadata.Protected' })

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
      <Header isConnected />
      <Navbar />

      <main className={styles.root}>
        {/*         <Sidebar className={styles.sidebar} /> */}
        {children}
      </main>
      <Footer />
    </>
  )
}

export default ProtectedLayout
