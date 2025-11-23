import React, { ReactNode } from 'react'
import styles from './layout.module.scss'
import { getTranslations } from 'next-intl/server'
import HeaderWithAuth from '@/components/Layout/Header/HeaderWithAuth'
import Footer from '@/components/Layout/Footer'
import Navbar from './_components/Navbar'
import { Metadata } from 'next/types'
import { locales } from '@/i18n/routing'
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
      <HeaderWithAuth />
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
