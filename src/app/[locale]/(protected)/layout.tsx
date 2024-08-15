import React, { ReactNode, Suspense } from 'react'
import styles from './layout.module.scss'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import Navbar from './_components/Navbar'
import { getNextLocale } from '@/utils/cookies'
import { Metadata } from 'next'
import { locales } from '@/lib/i18n/navigation'
import { Locale } from '@/types/locale'

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = getNextLocale()
  const t = await getTranslations({ locale, namespace: 'Metadata.Protected' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

interface PropTypes {
  params: { locale: Locale }
  children: ReactNode
}
const ProtectedLayout = ({ children, params: { locale } }: PropTypes) => {
  unstable_setRequestLocale(locale)

  return (
    <Suspense>
      <Header isConnected />
      <Navbar />
      <main className={styles.root}>
        {/*         <Sidebar className={styles.sidebar} /> */}
        {children}
      </main>
      <Footer />
    </Suspense>
  )
}

export default ProtectedLayout
