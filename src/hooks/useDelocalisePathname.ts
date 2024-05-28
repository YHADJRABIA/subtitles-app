import { locales } from '@/lib/i18n/navigation'
import { usePathname } from 'next/navigation'

/**
 * Custom hook to extract pathname without locale prefix.
 *
 * @returns {string} Pathname without locale prefix.
 */

export const useDelocalisedPathname = () => {
  const pathname = usePathname()

  const localePattern = locales.join('|')
  const re = new RegExp(`^/(${localePattern})(?=/|$)`)

  // Remove the locale prefix
  return pathname.replace(re, '')
}
