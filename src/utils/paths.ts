import { locales, pathnames } from '@/lib/i18n/navigation'
import { protectedRoutes, loginRegisterRoutes } from '@/routes/routes'
import { Pathname } from '@/types/pathnames'

/**
 * Checks if a pathname matches any of the localised routes.
 * @param {string[]} routes Array of routes to check.
 * @param {Pathname} pathname Pathname to match.
 * @returns {boolean} True if the pathname matches any of the localised routes, false otherwise.
 */
export const pathnameMatchesLocalisedRoutes = (
  routes: string[],
  pathname: Pathname
): boolean => {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${routes
      .flatMap(p => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  )
  return publicPathnameRegex.test(pathname)
}

/**
 * Checks if pathname matches a protected route.
 * @param {Pathname} pathname Pathname to check.
 * @returns {boolean} True if the pathname matches any of the localised protected routes, false otherwise.
 */
export const isProtectedPath = (pathname: Pathname): boolean => {
  const localisedProtectedRoutes = protectedRoutes.flatMap(route =>
    getLocalisedPathsForPathname(route)
  )
  return pathnameMatchesLocalisedRoutes(localisedProtectedRoutes, pathname)
}

// Returns true if pathname is any localised version of /login or /register
export const isLoginOrRegisterPath = (pathname: Pathname): boolean => {
  const localisedLoginRegisterRoutes = loginRegisterRoutes.flatMap(route =>
    getLocalisedPathsForPathname(route)
  )

  return pathnameMatchesLocalisedRoutes(localisedLoginRegisterRoutes, pathname)
}

/**
 * Retrieves localised paths for a given pathname.
 * @param {Pathname} path Pathname to retrieve localised paths for.
 * @returns {string[]} Array of localised paths corresponding to the given pathname.
 */
export const getLocalisedPathsForPathname = (path: Pathname): string[] => {
  const localisedPaths = pathnames[path]
  if (typeof localisedPaths === 'object') {
    return Object.values(localisedPaths)
  }
  return [localisedPaths]
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
