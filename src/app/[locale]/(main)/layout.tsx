import React, { ReactNode } from 'react'
import Footer from '@/components/Layout/Footer'
import styles from './layout.module.scss'
import HeaderWithAuth from '@/components/Layout/Header/HeaderWithAuth'
import BreadcrumbsContainer from '@/components/UI/Breadcrumbs/BreadcrumbsContainer'

interface PropTypes {
  children: ReactNode
}

const layout = ({ children }: PropTypes) => {
  return (
    <>
      <HeaderWithAuth isConcealable />
      <main className={styles.root}>
        <BreadcrumbsContainer className={styles.breadCrumbs} />
        {children}
      </main>
      <Footer />
    </>
  )
}

export default layout
