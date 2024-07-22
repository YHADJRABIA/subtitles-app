import { pathnames } from '@/lib/i18n/navigation'
import { Pathnames } from 'next-intl/routing'
import { Locales } from './locale'

export type Pathname = keyof typeof pathnames

export type PathnamesType = Pathnames<Locales>
