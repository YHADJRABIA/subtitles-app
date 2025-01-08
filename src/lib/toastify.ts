import { toast, ToastOptions } from 'react-toastify'

interface PropTypes {
  (
    status: 'success' | 'info' | 'warning' | 'error',
    message: string,
    options?: ToastOptions
  ): void
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
interface PropTypes {
  type: 'success' | 'error'
  message: string
}

export const storeNotification = (type: PropTypes['type'], message: string) => {
  localStorage.setItem('notification', JSON.stringify({ type, message }))
}

export const getStoredNotification = (): PropTypes | null => {
  const stored = localStorage.getItem('notification')
  if (!stored) return null

  localStorage.removeItem('notification')
  return JSON.parse(stored)
}
