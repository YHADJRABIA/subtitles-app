import { locales } from '@/lib/i18n/navigation'
import { publicRoutes } from '@/routes/routes'

export const isPublicPath = (pathname: string): boolean => {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicRoutes
      .flatMap(p => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  )
  return publicPathnameRegex.test(pathname)
}

interface HrefParams {
  searchParams: string
  pathname: string
}

/**
 * Sanitises input href by returning searchParams or clean pathname.
 * @param {string | URL} href The URL or string representation of a URL to sanitise.
 * @returns {HrefParams} Object containing search parameters (`searchParams`) and pathname (`pathname`).
 */

export const extractHrefParams = (href: string | URL): HrefParams => {
  const url =
    typeof href === 'string' ? new URL(href, 'http://example.com') : href
  return {
    searchParams: url.search,
    pathname: url.pathname,
  }
}
