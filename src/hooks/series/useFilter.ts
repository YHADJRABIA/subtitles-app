import { useMemo } from 'react'
import { Series } from '@/types/series'
import { useSeriesFilters } from './useSeriesFilters'

export const useFilter = (series: Series[]) => {
  const {
    searchQuery,
    selectedGenre,
    selectedCountry,
    selectedYear,
    sortBy,
    sortDirection,
  } = useSeriesFilters()

  const availableYears = useMemo(() => {
    const years = series.map(s => s.releaseYear)
    return [...new Set(years)].sort((a, b) => b - a)
  }, [series])

  const filteredSeries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    const hasSearch = !!query.length
    const hasGenreFilter = selectedGenre !== 'all'
    const hasCountryFilter = selectedCountry !== 'all'
    const hasYearFilter = selectedYear !== 'all'

    const matchesSearch = ({ name, translatedName, slug }: Series) => {
      if (!hasSearch) return true

      const searchText = [name, translatedName, slug]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return searchText.includes(query)
    }

    const matchesFilters = (item: Series) => {
      if (!matchesSearch(item)) return false
      if (hasGenreFilter && item.genre !== selectedGenre) return false
      if (hasCountryFilter && item.countryOfOrigin !== selectedCountry)
        return false
      if (hasYearFilter && item.releaseYear !== selectedYear) return false

      return true
    }

    const filtered = series.filter(matchesFilters).sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'releaseYear':
          comparison = a.releaseYear - b.releaseYear
          break
        case 'numberOfSeasons':
          comparison = a.numberOfSeasons - b.numberOfSeasons
          break
      }

      return sortDirection === 'asc' ? comparison : -comparison
    })

    return filtered
  }, [
    series,
    searchQuery,
    selectedGenre,
    selectedCountry,
    selectedYear,
    sortBy,
    sortDirection,
  ])

  return { filteredSeries, availableYears }
}
