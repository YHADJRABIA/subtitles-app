import { routes, RoutePath } from '@/i18n/routing'

// Re-export routes from routing.ts (single source of truth)
export { routes, type RoutePath }

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
] satisfies RoutePath[]

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
] satisfies RoutePath[]

export const apiAuthPrefix = '/api/auth' // Routes handled by Next-Auth
