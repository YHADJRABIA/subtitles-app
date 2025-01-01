import { APIResponse } from '@/types/api'

export const getSuccessMessage = (
  response: { data: APIResponse },
  defaultMessage?: string
): string => (response?.data?.message || defaultMessage) ?? ''
