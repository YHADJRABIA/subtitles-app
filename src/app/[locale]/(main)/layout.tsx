import React, { ReactNode } from 'react'
import { getTranslations } from 'next-intl/server'
import Header from '@/components/Layout/Header/index'
import Footer from '@/components/Layout/Footer'

export const generateMetadata = async () => {
  const t = await getTranslations({ namespace: 'Metadata.Homepage' })

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
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default layout
