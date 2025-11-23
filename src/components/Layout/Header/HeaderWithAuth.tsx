'use client'
import React from 'react'
import Header from './index'
import { useSession } from 'next-auth/react'

interface PropTypes {
  isConcealable?: boolean
  isOnDashboard?: boolean
}

const HeaderWithAuth = ({
  isConcealable = false,
  isOnDashboard = false,
}: PropTypes) => {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <Header
      isConcealable={isConcealable}
      isConnected={!!user}
      showDashboardButton={!isOnDashboard}
      userAvatar={user?.image}
    />
  )
}

export default HeaderWithAuth
