'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { notify, ToastType } from '@/lib/toastify'
import { useLocalStorage } from '@/hooks/useLocalStorage'

interface PropTypes {
  type: ToastType
  message: string
}

// Persists toast call after redirect
// Toast data is read from localStorage

export default function NotificationHandler() {
  const pathname = usePathname()

  const [notification, setNotification] = useLocalStorage<PropTypes>({
    key: 'notification',
    defaultValue: null,
  })

  useEffect(() => {
    if (!notification) return

    const { type, message } = notification

    notify(type, message, {
      onOpen: () => {
        setNotification(null)
      },
    })
  }, [notification, pathname, setNotification])

  return null
}
