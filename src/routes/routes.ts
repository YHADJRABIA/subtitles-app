export const LOGIN_ROUTE = '/login'
export const DEFAULT_LOGIN_REDIRECT_ROUTE = '/dashboard'

// These routes don't need authenticaition
export const publicRoutes = [
  '/',
  '/verify-email',
  '/send-verification-email',
  '/password/recovery',
  '/password/reset',
  '/register',
  LOGIN_ROUTE,
]
export const protectedRoutes = ['/dashboard']
export const apiAuthPrefix = '/api/auth'
