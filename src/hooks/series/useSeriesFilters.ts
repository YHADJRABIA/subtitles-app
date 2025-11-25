'use client'

import {
  parseAsString,
  parseAsInteger,
  parseAsStringEnum,
  useQueryStates,
} from 'nuqs'
import { SeriesCountry, SeriesGenre } from '@/types/series'
import { useClearSearch } from '@/store/useSeriesSearchStore'

export type SortOption = 'name' | 'releaseYear' | 'numberOfSeasons'
export type SortDirection = 'asc' | 'desc'

const SORT_OPTIONS: SortOption[] = ['name', 'releaseYear', 'numberOfSeasons']
const SORT_DIRECTIONS: SortDirection[] = ['asc', 'desc']
const AVAILABLE_GENRES: Array<SeriesGenre | 'all'> = ['all', 'comedy']
const AVAILABLE_COUNTRIES: Array<SeriesCountry | 'all'> = ['all', 'ru', 'kz']

const filterParsers = {
  search: parseAsString.withDefault(''),
  genre: parseAsStringEnum<SeriesGenre | 'all'>(AVAILABLE_GENRES).withDefault(
    'all'
  ),
  country: parseAsStringEnum<SeriesCountry | 'all'>(
    AVAILABLE_COUNTRIES
  ).withDefault('all'),
  releaseYear: parseAsInteger,
  sortBy: parseAsStringEnum<SortOption>(SORT_OPTIONS).withDefault('name'),
  order: parseAsStringEnum<SortDirection>(SORT_DIRECTIONS).withDefault('asc'),
}

export const useSeriesFilters = () => {
  const [filters, setFilters] = useQueryStates(filterParsers, {
    shallow: true,
    history: 'push',
  })
  const clearSearchStore = useClearSearch()

  const {
    search: searchQuery,
    genre: selectedGenre,
    country: selectedCountry,
    releaseYear,
    sortBy,
    order: sortDirection,
  } = filters

  const selectedYear = releaseYear ?? 'all'

  const setSearchQuery = (value: string) => setFilters({ search: value })
  const setSelectedGenre = (value: SeriesGenre | 'all') =>
    setFilters({ genre: value })
  const setSelectedCountry = (value: SeriesCountry | 'all') =>
    setFilters({ country: value })
  const setSelectedYear = (year: number | 'all') =>
    setFilters({ releaseYear: year === 'all' ? null : year })
  const setSortBy = (value: SortOption) => setFilters({ sortBy: value })
  const setSortDirection = (value: SortDirection) =>
    setFilters({ order: value })

  const clearAllFilters = () => {
    clearSearchStore()
    setFilters({
      search: null,
      genre: null,
      country: null,
      releaseYear: null,
      sortBy: null,
      order: null,
    })
  }

  return {
    searchQuery,
    selectedGenre,
    selectedCountry,
    selectedYear,
    sortBy,
    sortDirection,

    setSearchQuery,
    setSelectedGenre,
    setSelectedCountry,
    setSelectedYear,
    setSortBy,
    setSortDirection,

    clearFilters: clearAllFilters,
  }
}
