import { Locale } from '@/types/locale'

export const getCurrentYear = () => new Date().getFullYear()
export const hasExpired = (date: Date) => new Date(date) < new Date()

/**
 * Converts ISO date string to localised version of DD/MM/YYYY format
 * @param {Date} isoDateString ISO date string to convert
 * @param {Locale} locale Locale param
 * @returns {string} Formatted output
 */
export const formatDate = (
  isoDateString: Date,
  locale: Locale = 'fr'
): string => {
  const date = new Date(isoDateString)

  return new Intl.DateTimeFormat(locale).format(date)
}
