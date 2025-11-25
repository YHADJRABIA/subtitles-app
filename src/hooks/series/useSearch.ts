import {
  useQuery,
  useSetQuery,
  useClearSearch,
} from '@/store/useSeriesSearchStore'
import { Series } from '@/types/series'

const MAX_RESULTS = 5

export const useSearch = () => {
  const query = useQuery()
  const setQuery = useSetQuery()
  const clearSearch = useClearSearch()

  return {
    query,
    setQuery,
    clearSearch,
  }
}

export const getSearchSuggestions = (
  allSeries: Series[],
  query: string
): Series[] => {
  const trimmed = query.trim().toLowerCase()
  if (!trimmed) return []

  return allSeries
    .filter(series => {
      const searchText = [series.name, series.translatedName, series.slug]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return searchText.includes(trimmed)
    })
    .slice(0, MAX_RESULTS)
}
