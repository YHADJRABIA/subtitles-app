import createMiddleware from 'next-intl/middleware'
import { locales } from './utils/locales'

export default createMiddleware({
  // List of supported locales
  locales: locales,

  // Used when no locale matches
  defaultLocale: locales[0],
})

export const config = {
  // Match only internationalized pathnames and redirects accordingly
  matcher: ['/', '/signup', '/(en|fr)/:path*'],
}
