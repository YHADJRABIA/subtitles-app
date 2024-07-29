import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { locales } from './lib/i18n/navigation'
import { Locale } from './types/locale'

export default getRequestConfig(async ({ locale }) => {
  // Validate incoming `locale` param
  if (!locales.includes(locale as Locale)) notFound() // Returns not-found page if no match

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
