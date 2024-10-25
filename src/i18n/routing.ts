import { PathnamesType } from '@/types/pathnames'
import { defineRouting } from 'next-intl/routing'
import { Locale, Locales } from '@/types/locale'
import { createNavigation } from 'next-intl/navigation'

export const defaultLocale: Locale = 'en'
export const locales = ['en', 'fr'] satisfies Locales
export const localePrefix = 'as-needed' // No prefix for the default locale. /en -> /

export const pathnames = {
  // If all locales use the same pathname, a single external path can be provided
  '/': '/',

  // If locales use different paths, you can specify each external path per locale
  '/about': {
    en: '/about',
    fr: '/a-propos',
  },

  '/series': {
    en: '/series',
    fr: '/series',
  },
  '/series/[slug]': {
    en: '/series/[slug]',
    fr: '/series/[slug]',
  },

  /* Protected */
  '/dashboard': {
    en: '/dashboard',
    fr: '/tableau-de-bord',
  },
  '/dashboard/settings': {
    en: '/dashboard/settings',
    fr: '/tableau-de-bord/reglages',
  },
  '/dashboard/account': {
    en: '/dashboard/account',
    fr: '/tableau-de-bord/compte',
  },

  /* Auth */
  '/register': {
    en: '/register',
    fr: '/inscription',
  },
  '/login': {
    en: '/login',
    fr: '/connexion',
  },
  '/send-verification-email': {
    en: '/send-verification-email',
    fr: '/envoi-email-verification',
  },
  '/verify-email': {
    en: '/verify-email',
    fr: '/verification-email',
  },
  '/password/recovery': {
    en: '/password/recovery',
    fr: '/mot-de-passe/recuperation',
  },
  '/password/reset': {
    en: '/password/reset',
    fr: '/mot-de-passe/reinitialisation',
  },
} satisfies PathnamesType

export const routing = defineRouting({
  locales: locales,
  defaultLocale: defaultLocale,
  localePrefix: {
    mode: localePrefix,
  },
  pathnames: pathnames as typeof pathnames & Record<string, string>,
})

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing)
