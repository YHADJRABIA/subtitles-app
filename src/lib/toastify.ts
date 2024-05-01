import { toast } from 'react-toastify'

interface PropTypes {
  (status: 'success' | 'info' | 'warning' | 'error', message: string): void
}

export const notify: PropTypes = (status, message) => {
  switch (status) {
    case 'success':
      toast.success(message, {
        position: 'top-right',
      })

      break

    case 'info':
      toast.error(message, {
        position: 'top-right',
      })
      break

    case 'warning':
      toast.error(message, {
        position: 'top-right',
      })
      break

    case 'error':
      toast.error(message, {
        position: 'top-right',
      })
      break

    default:
      break
  }
}
