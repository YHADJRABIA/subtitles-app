import React, { ReactNode } from 'react'
import Footer from '@/components/Layout/Footer'
import { getUserSession } from '@/utils/session'
import styles from './layout.module.scss'
import FoldableHeader from '@/components/Layout/Header/FoldableHeader'

interface PropTypes {
  children: ReactNode
}
const layout = async ({ children }: PropTypes) => {
  const user = await getUserSession()

  return (
    <>
      <FoldableHeader isConnected={!!user} />
      <main className={styles.root}>{children}</main>
      <Footer />
    </>
  )
}

export default layout
