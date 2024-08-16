import React, { ReactNode } from 'react'
import Footer from '@/components/Layout/Footer'
import { getUserSession } from '@/utils/session'
import styles from './layout.module.scss'
import ConcealableHeader from '@/components/Layout/Header/ConcealableHeader'

interface PropTypes {
  children: ReactNode
}

const layout = async ({ children }: PropTypes) => {
  const user = await getUserSession()

  return (
    <>
      <ConcealableHeader isConnected={!!user} />
      <main className={styles.root}>{children}</main>
      <Footer />
    </>
  )
}

export default layout
