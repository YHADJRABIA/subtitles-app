import { Pathname, PathnamesType } from '@/types/pathnames'
import { useLocale } from 'next-intl'
import { pathnames } from '@/lib/i18n/navigation'
import { extractHrefParams } from '@/utils/paths'

/**
 * Translates pathname into current locale according to internationalised routing system.
 * @param {string} href href to process.
 * @param {boolean} hasSearchParams Determines if search parameters should be appended to the returned pathname.
 * @returns Pathname translated to current locale according to next-intl.
 */

interface PropTypes {
  href: string
  hasSearchParams?: boolean
}

export const useTranslatePathname = ({
  href,
  hasSearchParams = true,
}: PropTypes) => {
  const locale = useLocale()

  // Strip pathname of search params/hashes...etc
  const sanitisedPathname = extractHrefParams(href).pathname

  // Check if match exists for pathname in routing dictionary
  const matchingPathname = pathnames[sanitisedPathname as Pathname]
  // If no match, there is nothing to translate, return raw href
  if (!matchingPathname) return href

  // Extract query params string to append later on
  const searchParams = hasSearchParams
    ? extractHrefParams(href).searchParams
    : ''

  // Get route's translation
  const localisedPathname = (matchingPathname as PathnamesType)[locale]

  const translatedPathname = `/${locale}${localisedPathname}${searchParams}`

  return translatedPathname
}
