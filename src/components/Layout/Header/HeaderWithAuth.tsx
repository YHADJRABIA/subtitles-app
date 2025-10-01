'use client'
import React from 'react'
import Header from './index'
import { useSession } from 'next-auth/react'

interface PropTypes {
  isConcealable?: boolean
}

const HeaderWithAuth = ({ isConcealable = false }: PropTypes) => {
  const { data: session } = useSession()

  return <Header isConcealable={isConcealable} isConnected={!!session?.user} />
}

export default HeaderWithAuth
