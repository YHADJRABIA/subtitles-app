import React, { ReactNode } from 'react'
import Header from '@/components/Layout/Header/index'
import Footer from '@/components/Layout/Footer'
import { getUserSession } from '@/utils/session'

interface PropTypes {
  children: ReactNode
}
const layout = async ({ children }: PropTypes) => {
  const user = await getUserSession()
  return (
    <>
      <Header isConnected={!!user} />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default layout
