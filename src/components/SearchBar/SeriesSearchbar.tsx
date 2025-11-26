'use client'

import { useEffect, useRef, useMemo, useState } from 'react'
import Searchbar from '@/components/Searchbar'
import { Series } from '@/types/series'
import SeriesSuggestion from '@/components/Searchbar/SeriesSuggestion'
import { useTranslations } from 'next-intl'
import { useSeriesData } from '@/context/SeriesProvider'
import { useSearch, getSearchSuggestions } from '@/hooks/series/useSearch'
import { useSeriesFilters } from '@/hooks/series/useSeriesFilters'
import { useDebounce } from '@/hooks/useDebounce'

export interface PropTypes {
  className?: string
  isFoldable?: boolean
}

const SeriesSearchbar = ({ className, isFoldable }: PropTypes) => {
  const t = useTranslations('Series')
  const allSeries = useSeriesData()
  const { query, setQuery } = useSearch()
  const { setSearchQuery } = useSeriesFilters()
  const [debouncedQuery, setDebouncedQuery] = useState(query)
  const [isPending, setIsPending] = useState(false)

  const updateDebounced = useDebounce(() => {
    setDebouncedQuery(query)
    setSearchQuery(query)
    setIsPending(false)
  }, 300)

  const queryRef = useRef(query)
  useEffect(() => {
    queryRef.current = query
    setIsPending(query !== debouncedQuery)
    updateDebounced()
  }, [query, debouncedQuery, updateDebounced])

  useEffect(() => {
    return () => {
      void setSearchQuery(queryRef.current)
    }
  }, [setSearchQuery])

  const suggestions = useMemo(
    () => getSearchSuggestions(allSeries, debouncedQuery),
    [allSeries, debouncedQuery]
  )

  return (
    <Searchbar<Series>
      className={className}
      isFoldable={isFoldable}
      items={suggestions}
      loading={isPending}
      placeholder={t('search_placeholder')}
      renderItem={(series: Series, onSelect) => (
        <SeriesSuggestion series={series} onSelect={onSelect} />
      )}
      value={query}
      onChange={setQuery}
    />
  )
}

export default SeriesSearchbar
