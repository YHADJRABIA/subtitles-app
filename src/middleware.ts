import createMiddleware from 'next-intl/middleware'
import withAuth, { NextRequestWithAuth } from 'next-auth/middleware'
import { NextFetchEvent, NextResponse } from 'next/server'
import { isLoginOrRegisterPath, isProtectedPath } from './utils/paths'
import { defaultLocale, localePrefix, locales, pathnames } from '@/i18n/routing'
import { DEFAULT_LOGIN_REDIRECT_ROUTE, routes } from './routes/routes'
import { getToken } from 'next-auth/jwt'
import { Pathname } from './types/pathnames'
import { isDevelopment } from './utils/general'
import { checkRateLimit } from '@/lib/rate-limit'

const intlMiddleware = createMiddleware({
  defaultLocale,
  localePrefix,
  locales,
  pathnames,
})

// Initialise rate limiter for API routes

// Middleware for rate limiting API requests
export async function apiRateLimitMiddleware(req: NextRequestWithAuth) {
  const rateLimitResponse = await checkRateLimit(req)
  return rateLimitResponse ?? NextResponse.next()
}

// AuthMiddleware is skipped if user hits public routes
const authMiddleware = withAuth(
  function onSuccess(req) {
    // Skip to IntlMiddleware if user is authenticated
    return intlMiddleware(req)
  },
  {
    callbacks: {
      authorized: ({ token }) => token !== null, // User is considered authenticated if token isn't null
    },
    pages: {
      // Replace Next-auth's built-in pages with own custom pages
      signIn: routes['/login'], // Unauthenticated user is redirected here when attempting to access protected routes
    },
  }
)

// Called whenever request matches config
// Dispatches request to middlewares depending on conditions
export default async function middleware(req: NextRequestWithAuth) {
  const { pathname } = req.nextUrl

  // Allow draft mode routes to bypass middleware checks
  if (pathname.startsWith('/api/cms/')) {
    return NextResponse.next() // Bypass all middleware checks
  }

  // Handle API rate limiting
  if (pathname.startsWith('/api')) {
    if (isDevelopment) return NextResponse.next() // Bypass in dev mode

    return apiRateLimitMiddleware(req)
  }

  const isProtectedRoute = isProtectedPath(pathname as Pathname)
  // Needed outside of authMiddleware to access session (has to be the same as in authOptions at /auth.config.ts)
  const secret = process.env.NEXTAUTH_SECRET
  const session = await getToken({ req, secret })
  const isConnected = !!session

  // Redirect authenticated users away from login/register pages
  if (isConnected && isLoginOrRegisterPath(pathname as Pathname)) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT_ROUTE, req.url))
  }

  // Skip authMiddleware if route is public
  return isProtectedRoute
    ? authMiddleware(req, {} as NextFetchEvent)
    : intlMiddleware(req)
}

export const config = {
  matcher: ['/api/(.*)', '/((?!_next|.*\\..*).*)'],
}
