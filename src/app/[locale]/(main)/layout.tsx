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

  /* TODO: Hide Header when user scrolls up and hide it when user scrolls down */
  return (
    <>
      <Header isConnected={!!user} />
      <main className={styles.root}>{children}</main>
      <Footer />
    </>
  )
}

export default layout
