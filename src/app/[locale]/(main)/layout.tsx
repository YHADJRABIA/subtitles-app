import React, { ReactNode } from 'react'
import Header from '@/components/Layout/Header/index'
import Footer from '@/components/Layout/Footer'
import { getUserSession } from '@/utils/session'
import styles from './layout.module.scss'

interface PropTypes {
  children: ReactNode
}
const layout = async ({ children }: PropTypes) => {
  const user = await getUserSession()
  return (
    <>
      <Header isConnected={!!user} />
      <main className={styles.root}>{children}</main>
      <Footer />
    </>
  )
}

export default layout
