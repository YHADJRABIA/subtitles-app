import { SeriesCountry } from '@/types/series'

export const getFlagFromCountryCode = (
  countryCode: SeriesCountry
): string | null => {
  if (!countryCode) return null

  const filePath = `/flags/${countryCode.toLowerCase()}.svg`

  return filePath
}
