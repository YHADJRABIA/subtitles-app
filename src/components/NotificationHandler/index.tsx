'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { notify } from '@/lib/toastify'

interface PropTypes {
  type: 'success' | 'error'
  message: string
}

// Persists toast call after redirect
// Toast data is read from localStorage

export default function NotificationHandler() {
  const pathname = usePathname()

  useEffect(() => {
    const stored = localStorage.getItem('notification')
    if (!stored) return

    const notification: PropTypes = JSON.parse(stored)

    const { type, message } = notification

    notify(type, message, {
      onOpen: () => {
        setTimeout(() => {
          localStorage.removeItem('notification')
        }, 1000)
      },
    })
  }, [pathname])

  return null
}
