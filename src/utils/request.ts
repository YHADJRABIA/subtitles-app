import { NextRequest } from 'next/server'
import { isRecognisedLocale } from './internationalisation/language'
import { defaultLocale } from '@/lib/i18n/navigation'

export const getLocaleFromSearchParam = (req: NextRequest) => {
  let locale = req.nextUrl.searchParams.get('locale') || ''

  if (!isRecognisedLocale(locale)) {
    locale = defaultLocale
  }
  return locale
}