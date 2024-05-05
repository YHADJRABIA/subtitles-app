'use client'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

interface PropTypes {
  children: ReactNode
  session: Session
}

const AuthProvider = ({ children, session }: PropTypes) => {
  return <SessionProvider session={session}>{children}</SessionProvider>
}

export default AuthProvider
