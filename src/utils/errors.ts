import axios from 'axios'
import { ZodError } from 'zod'

export const getErrorMessage = (error: unknown): string => {
  let message: string

  if (axios.isAxiosError(error)) {
    if (error.response) {
      message = error.response.data?.message || 'Something went wrong'
    } else {
      message = error.message || 'Something went wrong'
    }
  } else if (error instanceof Error) {
    message = error.message
  } else if (typeof error === 'string') {
    message = error
  } else if (
    typeof error === 'object' &&
    error !== null &&
    'error' in error &&
    'status' in error
  ) {
    message = (error.error as string) || 'Something went wrong'
  } else {
    message = 'Something went wrong' // TODO: internationalise
  }

  return message
}

interface ZodErrors {
  message: string
}

export const getZodErrors = (error: ZodError): ZodErrors => {
  let zodErrors = { message: '' }
  error.issues.forEach(issue => {
    zodErrors = { ...zodErrors, message: issue.message }
  })
  return zodErrors
}
