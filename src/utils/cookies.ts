import { defaultLocale } from '@/lib/i18n/navigation'
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { NextRequest } from 'next/server'

/**
 * Extracts the locale from the NEXT_LOCALE cookie out of a Next cookies object.
 * @param cookies The cookies object containing the locale cookie.
 * @returns A string representing the locale.
 */
const getLocaleFromNextCookie = (
  cookies: ReadonlyRequestCookies | RequestCookies
) => {
  const nextCookie = cookies.get('NEXT_LOCALE')
  const locale = nextCookie ? nextCookie.value : defaultLocale

  return locale
}

export const getLocaleFromNextRequest = (req: NextRequest) => {
  return getLocaleFromNextCookie(req.cookies)
}

export const getLocaleFromNextCookies = (cookies: ReadonlyRequestCookies) => {
  return getLocaleFromNextCookie(cookies)
}
