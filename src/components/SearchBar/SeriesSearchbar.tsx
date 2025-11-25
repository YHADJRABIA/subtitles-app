'use client'

import Searchbar from '@/components/Searchbar'
import { Series } from '@/types/series'
import SeriesSuggestion from '@/components/Searchbar/SeriesSuggestion'
import { useTranslations } from 'next-intl'
import { useSeriesData } from '@/context/SeriesProvider'
import { useSearch } from '@/hooks/series/useSearch'
import { useSeriesFilters } from '@/hooks/series/useSeriesFilters'
import { useTimeout } from '@/hooks/useTimeout'

export interface PropTypes {
  className?: string
  isFoldable?: boolean
}

const SeriesSearchbar = ({ className, isFoldable }: PropTypes) => {
  const t = useTranslations('Series')
  const allSeries = useSeriesData()
  const { query, setQuery, suggestions, isLoading, clearSearch } =
    useSearch(allSeries)
  const { setSearchQuery } = useSeriesFilters()

  useTimeout({
    callback: () => {
      setSearchQuery(query)
    },
    deps: [query, setSearchQuery],
  })

  return (
    <Searchbar<Series>
      className={className}
      isFoldable={isFoldable}
      items={suggestions}
      loading={isLoading}
      placeholder={t('search_placeholder')}
      renderItem={(series: Series, onSelect) => (
        <SeriesSuggestion series={series} onSelect={onSelect} />
      )}
      value={query}
      onChange={setQuery}
      onSelect={clearSearch}
    />
  )
}

export default SeriesSearchbar
