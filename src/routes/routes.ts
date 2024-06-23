import { Pathname } from '@/types/pathnames'

export const LOGIN_ROUTE: Pathname = '/login'
export const REGISTER_ROUTE: Pathname = '/register'
export const DEFAULT_LOGIN_REDIRECT_ROUTE: Pathname = '/dashboard'

// These routes don't need authenticaition
export const publicRoutes = [
  '/',
  '/verify-email',
  '/send-verification-email',
  '/password/recovery',
  '/password/reset',
  REGISTER_ROUTE,
  LOGIN_ROUTE,
] satisfies Pathname[]

export const protectedRoutes = ['/dashboard'] satisfies Pathname[]
export const apiAuthPrefix = '/api/auth'
