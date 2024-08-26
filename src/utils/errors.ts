import { getTranslation } from '@/lib/i18n/getTranslation'
import axios from 'axios'

import { ZodError } from 'zod'

export const getErrorMessage = (error: unknown): string | Promise<string> => {
  const [t_tooManyRequests, t_somethingWentWrong] = [
    getTranslation('General', 'too_many_requests'),
    getTranslation('General', 'something_went_wrong'),
  ]

  let message: string | Promise<string>

  if (axios.isAxiosError(error)) {
    if (error.response) {
      if (error.response.status === 429) {
        return t_tooManyRequests
      }
      message = error.response.data?.message || t_somethingWentWrong
    } else {
      message = error.message || t_somethingWentWrong
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
    message = (error.error as string) || t_somethingWentWrong
  } else {
    message = t_somethingWentWrong
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
