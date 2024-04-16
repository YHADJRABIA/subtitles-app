import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { locales } from './utils/locales'

export default getRequestConfig(async ({ locale }) => {
  // Validate incoming `locale` param
  if (!locales.includes(locale as string)) notFound() // Returns not-found page if no match

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
