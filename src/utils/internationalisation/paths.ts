import { locales } from '@/lib/i18n/navigation'

/**
 * Strips locale prefix from a given localised pathname.
 * Example: '/fr/test' becomes '/test'
 * @param {string} localisedPathname Pathname might include a locale prefix
 * @returns Pathname without locale prefix
 */

export const removeLocalePrefixFromPathname = (localisedPathname: string) => {
  const localePattern = locales.join('|')
  const re = new RegExp(`^/(${localePattern})(?=/|$)`)
  const sanitisedPathname = localisedPathname.replace(re, '')

  return sanitisedPathname
}
