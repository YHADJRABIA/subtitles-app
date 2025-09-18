import React, { ReactNode, Suspense } from 'react'
import styles from './layout.module.scss'
import { getTranslations } from 'next-intl/server'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import Navbar from './_components/Navbar'
import { Metadata } from 'next'
import { locales } from '@/i18n/routing'
import Loader from '@/components/UI/Loader'
import { MetaDataProps } from '../layout'

export const generateStaticParams = () => locales.map(locale => ({ locale }))

export const generateMetadata = async ({
  params,
}: MetaDataProps): Promise<Metadata> => {
  const { locale } = await params

  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: { template: `${t('prefix')} %s`, default: t('Protected.title') },
    description: t('Protected.description'),
    robots: { index: false, follow: false },
  }
}

interface PropTypes {
  children: ReactNode
}
const ProtectedLayout = ({ children }: PropTypes) => {
  return (
    <>
      <Suspense fallback={<Loader size={20} />}>
        <Header isConnected />
      </Suspense>
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
