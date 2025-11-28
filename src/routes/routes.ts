import { pathnames } from '@/i18n/routing'
import { Pathname } from '@/types/pathnames'

/**
 * Type-safe routes object. Access routes via:
 * - routes['/login']
 * - routes['/dashboard/settings']
 */
export const routes = Object.keys(pathnames).reduce(
  (acc, key) => {
    acc[key as Pathname] = key as Pathname
    return acc
  },
  {} as Record<Pathname, Pathname>
)

// Redirect routes
export const DEFAULT_LOGIN_REDIRECT_ROUTE = routes['/dashboard']
export const DEFAULT_LOGOUT_REDIRECT_ROUTE = routes['/']

/** Routes accessible without requiring authentication. */
export const publicAuthRoutes = [
  routes['/register'],
  routes['/login'],
  routes['/verify-email'],
  routes['/send-verification-email'],
  routes['/password/recovery'],
  routes['/password/reset'],
] satisfies Pathname[]

/** Routes accessible only as unauthenticated user */
export const loginRegisterRoutes = [
  routes['/register'],
  routes['/login'],
] as const

/** Routes redirecting to '/login' if accessed as unauthenticated user. */
export const protectedRoutes = [
  routes['/dashboard'],
  routes['/dashboard/settings'],
  routes['/dashboard/account'],
] satisfies Pathname[]

export const apiAuthPrefix = '/api/auth' // Routes handled by Next-Auth
