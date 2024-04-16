import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  // List of supported locales
  locales: ['en', 'fr'],

  // Used when no locale matches
  defaultLocale: 'en',
})

export const config = {
  // Match only internationalized pathnames and redirects accordingly
  matcher: ['/', '/(de|fr)/:path*'],
}
