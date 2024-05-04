import { publicRoutes } from '@/routes/routes'
import { locales } from './locales'

export const isPublicPath = (pathname: string): boolean => {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicRoutes
      .flatMap(p => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  )
  return publicPathnameRegex.test(pathname)
}
