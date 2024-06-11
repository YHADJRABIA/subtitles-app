import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from 'next-intl/navigation'

export const defaultLocale = 'en'
export const locales = ['en', 'fr']
export const localePrefix = 'as-needed' // No prefix for the default locale. /en -> /

export const pathnames = {
  // If all locales use the same pathname, a single external path can be provided
  '/': '/',

  // If locales use different paths, you can specify each external path per locale
  '/dashboard': {
    en: '/dashboard',
    fr: '/tableau-de-bord',
  },
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
} satisfies Pathnames<typeof locales>

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames })
