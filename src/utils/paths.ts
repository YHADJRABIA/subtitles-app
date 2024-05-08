import { locales } from '@/lib/i18n/navigation'
import { publicRoutes } from '@/routes/routes'

export const isPublicPath = (pathname: string): boolean => {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicRoutes
      .flatMap(p => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  )
  return publicPathnameRegex.test(pathname)
}
