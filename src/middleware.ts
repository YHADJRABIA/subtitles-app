import createMiddleware from 'next-intl/middleware'
import withAuth, { NextRequestWithAuth } from 'next-auth/middleware'
import { NextFetchEvent, NextRequest } from 'next/server'
import { isPublicPath } from './utils/paths'
import { localePrefix, locales, pathnames } from './lib/navigation'

const intlMiddleware = createMiddleware({
  defaultLocale: 'en',
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
      signIn: '/login',
    },
  }
)

// Run authMiddleware for protected routes else run intlMiddleware
export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isPublicPage = isPublicPath(pathname)

  return isPublicPage
    ? intlMiddleware(req)
    : authMiddleware(req as NextRequestWithAuth, {} as NextFetchEvent)
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
