import { AxiosResponse } from 'axios'

export const getSuccessMessage = (
  response: AxiosResponse,
  defaultMessage?: string
): string => {
  return response?.data?.message || defaultMessage
}
