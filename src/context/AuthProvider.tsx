'use client'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'
import SessionValidityGuard from '@/components/Auth/SessionValidityGuard'

interface PropTypes {
  children: ReactNode
  session?: Session | null
}

const AuthProvider = ({ children, session = null }: PropTypes) => {
  return (
    <SessionProvider session={session}>
      <SessionValidityGuard>{children}</SessionValidityGuard>
    </SessionProvider>
  )
}

export default AuthProvider
