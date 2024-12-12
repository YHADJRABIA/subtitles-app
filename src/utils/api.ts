import { APIResponse } from '@/types/api'

export const getSuccessMessage = (
  response: { data: APIResponse },
  defaultMessage?: string
): string => {
  return (response?.data?.message || defaultMessage) ?? ''
}
