'use client'

import Searchbar from '@/components/Searchbar'
import { Series } from '@/types/series'
import SeriesSuggestion from '@/components/Searchbar/SeriesSuggestion'
import { useTranslations } from 'next-intl'
import { useSeriesSearch } from '@/hooks/useSeriesSearch'

export interface PropTypes {
  className?: string
  isFoldable?: boolean
}

const SeriesSearchbar = ({ className, isFoldable }: PropTypes) => {
  const t = useTranslations('Series')
  const { query, setQuery, suggestions, isLoading, clearSearch } =
    useSeriesSearch()

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
