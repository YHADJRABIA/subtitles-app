import { setLocalStorageItem } from '@/utils/localStorage'
import { toast, ToastOptions } from 'react-toastify'

export type ToastType = 'success' | 'info' | 'warning' | 'error'

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

interface LocalStorageType {
  type: ToastType
  message: string
}

export const storeNotification = (notificaiton: LocalStorageType) => {
  setLocalStorageItem('notification', notificaiton)
}
