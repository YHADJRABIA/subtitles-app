import { Locale, Locales } from '@/types/locale'
import { PathnamesType } from '@/types/pathnames'
import { createLocalizedPathnamesNavigation } from 'next-intl/navigation'

export const defaultLocale: Locale = 'en'
export const locales = ['en', 'fr'] satisfies Locales
export const localePrefix = 'as-needed' // No prefix for the default locale. /en -> /

export const pathnames = {
  // If all locales use the same pathname, a single external path can be provided
  '/': '/',

  // If locales use different paths, you can specify each external path per locale
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

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({
    locales,
    localePrefix,
    pathnames: pathnames as typeof pathnames & Record<string & {}, string>, // For Link component, to allow hrefs that aren't part of pathnames
  })
