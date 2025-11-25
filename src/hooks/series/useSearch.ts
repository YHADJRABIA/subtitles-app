import { useEffect, useMemo, useState, useTransition } from 'react'
import {
  useQuery,
  useSetQuery,
  useClearSearch,
} from '@/store/useSeriesSearchStore'
import { Series } from '@/types/series'
import { useDebounce } from '@/hooks/useDebounce'

const DEBOUNCE_MS = 300
const MAX_RESULTS = 5

export const useSearch = (allSeries: Series[]) => {
  const query = useQuery()
  const setQuery = useSetQuery()
  const clearSearch = useClearSearch()

  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [isLoading, startTransition] = useTransition()

  const updateDebouncedQuery = useDebounce(() => {
    const trimmed = query.trim()
    startTransition(() => {
      setDebouncedQuery(trimmed ? trimmed.toLowerCase() : '')
    })
  }, DEBOUNCE_MS)

  useEffect(() => {
    updateDebouncedQuery()
  }, [query, updateDebouncedQuery])

  const suggestions = useMemo(() => {
    if (!debouncedQuery) return []

    return allSeries
      .filter(series => {
        const searchText = [series.name, series.translatedName, series.slug]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()

        return searchText.includes(debouncedQuery)
      })
      .slice(0, MAX_RESULTS)
  }, [debouncedQuery, allSeries])

  return { query, setQuery, suggestions, isLoading, clearSearch }
}
