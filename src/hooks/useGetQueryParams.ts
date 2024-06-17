import { useSearchParams } from 'next/navigation'

/**
 * Extracts query params from current url.
 * Example: '/my-url?param=test' -> '?param=test'
 * @returns {string} Query params string if current url has one, otherwise empty string
 */

export const useGetQueryParams = (): string => {
  const searchParams = useSearchParams()
  const queryString = searchParams.toString()
  const queryParams = queryString ? `?${queryString}` : ''

  return queryParams
}
