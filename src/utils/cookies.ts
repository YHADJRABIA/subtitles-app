import { defaultLocale } from '@/lib/i18n/navigation'
import { NextRequest } from 'next/server'

/**
 * Retrieves the locale from the request cookie or defaults to the defaultLocale.
 * @param req The NextRequest object representing the incoming request.
 * @returns A string representing the locale.
 */

export const getLocaleFromRequestCookie = (req: NextRequest) => {
  const nextLocaleCookie = req.cookies.get('NEXT_LOCALE')
  const locale = nextLocaleCookie ? nextLocaleCookie.value : defaultLocale

  return locale
}
