import { Locale } from '@/types/locale'

export const getCurrentYear = () => new Date().getFullYear()
export const hasExpired = (date: Date) => new Date(date) < new Date()

/**
 * Converts ISO date string to a localised version with optional time (DD/MM/YYYY - HH:mm) format
 * @param {string} isoDateString ISO date string to convert
 * @param {Object} options Options for formatting
 * @param {string} [options.locale='fr'] Locale parameter
 * @param {boolean} [options.showTime=false] Whether to include time (hours and minutes)
 * @returns {Object|string} Formatted output
 */
export const formatDate = (
  isoDateString: string,
  options: { locale?: Locale; showTime?: boolean } = {}
): { date: string; time?: string } | string => {
  const { locale = 'fr', showTime = false } = options

  // Convert ISO string to Date object
  const date = new Date(isoDateString)

  // Ensure that the date is valid
  if (isNaN(date.getTime())) {
    console.error('Invalid date string:', isoDateString)
    return 'Invalid date'
  }

  // Define the basic date format options
  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }

  const timeFormatOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  }

  // Format date and time separately
  const formattedDate = new Intl.DateTimeFormat(
    locale,
    dateFormatOptions
  ).format(date)
  const formattedTime = showTime
    ? new Intl.DateTimeFormat(locale, timeFormatOptions).format(date)
    : undefined

  return showTime ? { date: formattedDate, time: formattedTime } : formattedDate
}
