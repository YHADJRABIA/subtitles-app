'use client'

import NotificationHandler from '@/components/NotificationHandler'
import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

interface PropTypes {
  children: ReactNode
}

export default function ToastProvider({ children }: PropTypes) {
  return (
    <>
      <NotificationHandler />
      <ToastContainer />
      {children}
    </>
  )
}
