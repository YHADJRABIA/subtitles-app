import { locales, pathnames } from '@/i18n/routing'
import { protectedRoutes, loginRegisterRoutes } from '@/routes/routes'
import { IntlMessagesKey } from '@/types/global'
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
 * @param {string | URL} href URL or string representation of a URL to sanitise.
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

// Returns true if the first slug of the path matches the first slug of the current path
// Example: /test/example and /test will return true
export const hasMatchingFirstSlug = (
  path: Pathname,
  currentPath: string
): boolean => {
  if (!path || !currentPath) return false
  if (path === '/') return currentPath === '/'

  const linkSlug = path.split('/')[1]
  const currentSlug = currentPath.split('/')[1]

  return linkSlug === currentSlug
}

// TODO: refactor
export const generateBreadcrumbs = (
  pathname: string,
  t: (key: IntlMessagesKey) => string,
  params?: Readonly<Record<string, string | string[] | undefined>>
): Array<{ label: string; href: string }> => {
  if (pathname === '/') return []

  const KNOWN_SEGMENTS = new Set([
    'about',
    'series',
    'dashboard',
    'settings',
    'account',
  ])

  const breadcrumbs: Array<{ label: string; href: string }> = [
    { label: t('home' as IntlMessagesKey), href: '/' },
  ]

  const formatLabel = (segment: string): string => {
    const lower = segment.toLowerCase()
    if (KNOWN_SEGMENTS.has(lower)) return t(lower as IntlMessagesKey)

    // Convert slug-like segments into title case
    return lower
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ')
  }

  const resolveParam = (key: string): string | null => {
    const value = params?.[key]
    if (!value) return null
    return Array.isArray(value) ? value[0] : value
  }

  let currentPath = ''

  for (const rawSegment of pathname.split('/').filter(Boolean)) {
    let segment = rawSegment

    // Handle dynamic route segments like [id]
    if (segment.startsWith('[') && segment.endsWith(']')) {
      const paramKey = segment.slice(1, -1)
      const resolved = resolveParam(paramKey)
      if (!resolved) continue
      segment = decodeURIComponent(resolved)
    }

    currentPath += `/${segment}`
    breadcrumbs.push({
      label: formatLabel(segment),
      href: currentPath,
    })
  }

  return breadcrumbs
}
