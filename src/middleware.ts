import createMiddleware from 'next-intl/middleware'
import withAuth, { NextRequestWithAuth } from 'next-auth/middleware'
import { NextFetchEvent, NextRequest } from 'next/server'
import { isPublicPath } from './utils/paths'
import {
  defaultLocale,
  localePrefix,
  locales,
  pathnames,
} from './lib/i18n/navigation'
import { LOGIN_ROUTE } from './routes/routes'

const intlMiddleware = createMiddleware({
  defaultLocale,
  localePrefix,
  locales,
  pathnames,
})

const authMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req)
  },
  {
    callbacks: {
      authorized: ({ token }) => token !== null,
    },
    pages: {
      signIn: LOGIN_ROUTE,
    },
  }
)

// Run authMiddleware for protected routes else run intlMiddleware
export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isPublicRoute = isPublicPath(pathname)

  return isPublicRoute
    ? intlMiddleware(req)
    : authMiddleware(req as NextRequestWithAuth, {} as NextFetchEvent)
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
