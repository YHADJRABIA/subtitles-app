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
