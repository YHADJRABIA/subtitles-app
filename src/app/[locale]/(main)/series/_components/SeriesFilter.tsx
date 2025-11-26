'use client'

import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import {
  useSeriesFilters,
  UI_GENRES,
  UI_COUNTRIES,
  SORT_OPTIONS,
  type SortOption,
} from '@/hooks/series/useSeriesFilters'
import Filter from '@/components/UI/Filter'
import type { SeriesGenre, SeriesCountry } from '@/types/series'
import {
  PiFilmSlate as GenreIcon,
  PiGlobe as CountryIcon,
  PiCalendarBlank as YearIcon,
  PiSortAscending as SortAscIcon,
} from 'react-icons/pi'

interface SeriesFilterProps {
  availableYears: number[]
}

const SeriesFilter = ({ availableYears }: SeriesFilterProps) => {
  const t = useTranslations()
  const {
    selectedGenre,
    selectedCountry,
    selectedYear,
    sortBy,
    sortDirection,
    setSelectedGenre,
    setSelectedCountry,
    setSelectedYear,
    setSortBy,
    setSortDirection,
    clearFilters,
  } = useSeriesFilters()

  const activeFiltersCount = [
    selectedGenre !== 'all',
    selectedCountry !== 'all',
    selectedYear !== 'all',
    sortBy !== 'name',
  ].filter(Boolean).length

  const isAscending = sortDirection === 'asc'
  const sortDirectionLabel = t(
    isAscending ? 'Series.sort_asc' : 'Series.sort_desc'
  )

  const toggleSortDirection = () =>
    setSortDirection(isAscending ? 'desc' : 'asc')

  const sections = useMemo(
    () => [
      {
        title: t('Filters.genre'),
        icon: GenreIcon,
        options: UI_GENRES.map(genre => ({
          value: genre,
          label: t(`Series.genre_${genre}`),
        })),
        selectedValue: selectedGenre,
        onSelect: (value: string | number | 'all') =>
          setSelectedGenre(value as SeriesGenre | 'all'),
      },
      {
        title: t('Filters.country'),
        icon: CountryIcon,
        options: UI_COUNTRIES.map(country => ({
          value: country,
          label: t(`Series.Country.${country}`),
        })),
        selectedValue: selectedCountry,
        onSelect: (value: string | number | 'all') =>
          setSelectedCountry(value as SeriesCountry | 'all'),
      },
      {
        title: t('Filters.year'),
        icon: YearIcon,
        options: availableYears.map(year => ({
          value: year,
          label: String(year),
        })),
        selectedValue: selectedYear,
        onSelect: (value: string | number | 'all') =>
          setSelectedYear(value as number | 'all'),
      },
      {
        title: t('Filters.sort_by'),
        icon: SortAscIcon,
        options: SORT_OPTIONS.map(option => ({
          value: option,
          label: t(`Series.sort_${option}`),
        })),
        selectedValue: sortBy,
        onSelect: (value: string | number | 'all') =>
          setSortBy(value as SortOption),
      },
    ],
    [
      t,
      selectedGenre,
      selectedCountry,
      selectedYear,
      sortBy,
      availableYears,
      setSelectedGenre,
      setSelectedCountry,
      setSelectedYear,
      setSortBy,
    ]
  )

  return (
    <Filter
      activeFiltersCount={activeFiltersCount}
      clearLabel={t('Filters.clear')}
      sections={sections}
      sortDirection={sortDirection}
      sortDirectionLabel={sortDirectionLabel}
      sortLabel={t('Filters.toolbar_sort')}
      triggerLabel={t('Filters.toolbar_filters')}
      onClearFilters={clearFilters}
      onToggleSortDirection={toggleSortDirection}
    />
  )
}

export default SeriesFilter
