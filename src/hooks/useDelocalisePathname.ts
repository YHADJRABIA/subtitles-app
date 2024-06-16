import { locales } from '@/lib/i18n/navigation'
import { usePathname, useSearchParams } from 'next/navigation'

/**
 * Custom hook to extract pathname without locale prefix with or without queryparams.
 * @param {boolean} hasQueryParams  Determines if search parameters should be included in the returned pathname.
 * @returns {string} Pathname without locale prefix.
 */

export const useDelocalisedPathname = (
  hasQueryParams: boolean = true
): string => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const queryString = searchParams.toString()
  const queryParams = queryString ? `?${queryString}` : ''

  const localePattern = locales.join('|')
  const re = new RegExp(`^/(${localePattern})(?=/|$)`)

  // Remove the locale prefix
  const sanitisedPathname = pathname.replace(re, '')

  const delocalisedPathName = hasQueryParams
    ? sanitisedPathname + queryParams
    : sanitisedPathname

  return delocalisedPathName
}
