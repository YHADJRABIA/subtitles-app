import { toast, ToastOptions } from 'react-toastify'

type ToastType = 'success' | 'info' | 'warning' | 'error'

interface PropTypes {
  (status: ToastType, message: string, options?: ToastOptions): void
}

export const notify: PropTypes = (status, message, options = {}) => {
  const toastOptions = {
    position: 'top-right' as const,
    ...options,
  }

  switch (status) {
    case 'success':
      toast.success(message, toastOptions)
      break

    case 'info':
      toast.info(message, toastOptions)
      break

    case 'warning':
      toast.warning(message, toastOptions)
      break

    case 'error':
      toast.error(message, toastOptions)
      break
  }
}

// TODO: Refactor to something more generic like a hook
// key and values should be passed as param

export const storeNotification = (type: ToastType, message: string) => {
  localStorage.setItem('notification', JSON.stringify({ type, message }))
}

export const getStoredNotification = (): Omit<PropTypes, 'options'> | null => {
  const stored = localStorage.getItem('notification')
  if (!stored) return null

  localStorage.removeItem('notification')
  return JSON.parse(stored)
}
