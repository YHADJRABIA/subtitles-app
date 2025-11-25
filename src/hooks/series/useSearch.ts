import { useDeferredValue, useMemo, useEffect } from 'react'
import {
  useQuery,
  useSetQuery,
  useClearSearch,
  useSetSuggestions,
} from '@/store/useSeriesSearchStore'
import { Series } from '@/types/series'

const MAX_RESULTS = 5

export const useSearch = (allSeries: Series[]) => {
  const query = useQuery()
  const setQuery = useSetQuery()
  const clearSearch = useClearSearch()
  const setSuggestions = useSetSuggestions()

  const deferredQuery = useDeferredValue(query)

  const filteredSuggestions = useMemo(() => {
    const trimmed = deferredQuery.trim().toLowerCase()
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
  }, [deferredQuery, allSeries])

  useEffect(() => {
    setSuggestions(filteredSuggestions)
  }, [filteredSuggestions, setSuggestions])

  const isLoading = query !== deferredQuery

  return {
    query,
    setQuery,
    suggestions: filteredSuggestions,
    isLoading,
    clearSearch,
  }
}
