import { Pathname } from '@/types/pathnames'

export const LOGIN_ROUTE: Pathname = '/login'
export const REGISTER_ROUTE: Pathname = '/register'
export const DEFAULT_LOGIN_REDIRECT_ROUTE: Pathname = '/dashboard'

/** Routes accessible without requiring authentication. */
export const publicRoutes = [
  '/',
  '/verify-email',
  '/send-verification-email',
  '/password/recovery',
  '/password/reset',
] satisfies Pathname[]

/** Routes accessible only as unauthenticated user */
export const loginRegisterRoutes = [
  REGISTER_ROUTE,
  LOGIN_ROUTE,
] satisfies Pathname[]

/** Routes redirecting to '/login' if accessed as unauthenticated user. */
export const protectedRoutes = ['/dashboard'] satisfies Pathname[]

export const apiAuthPrefix = '/api/auth' // Routes handled by Next-Auth
