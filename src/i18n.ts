import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { isRecognisedLocale } from './utils/internationalisation/language'

export default getRequestConfig(async ({ locale }) => {
  // Validate incoming `locale` param
  if (!isRecognisedLocale(locale)) notFound() // Returns not-found page if no match

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
