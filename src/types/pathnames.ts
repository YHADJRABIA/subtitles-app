import { RoutePath } from '@/i18n/routing'
import { Pathnames } from 'next-intl/routing'
import { Locales } from './locale'

// Re-export RoutePath as Pathname for backwards compatibility
export type Pathname = RoutePath

export type PathnamesType = Pathnames<Locales>
