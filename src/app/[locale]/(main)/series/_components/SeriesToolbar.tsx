'use client'

import { ReactNode, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import {
  useSeriesFilters,
  UI_GENRES,
  UI_COUNTRIES,
  SORT_OPTIONS,
} from '@/hooks/series/useSeriesFilters'
import { Dropdown } from '@/components/UI/Dropdown'
import { Button } from '@/components/UI/Button'
import Typography from '@/components/UI/Typography'
import styles from './SeriesToolbar.module.scss'
import {
  PiSlidersHorizontal as FiltersIcon,
  PiFilmSlate as GenreIcon,
  PiGlobe as CountryIcon,
  PiCalendarBlank as YearIcon,
  PiSortAscending as SortAscIcon,
  PiSortDescending as SortDescIcon,
  PiFunnelXThin as ClearFiltersIcon,
} from 'react-icons/pi'
import type { IconType } from 'react-icons/lib'

interface PropTypes {
  availableYears: number[]
}

const SeriesToolbar = ({ availableYears }: PropTypes) => {
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

  const years: number[] = useMemo(() => availableYears, [availableYears])

  const activeFiltersCount = [
    selectedGenre !== 'all',
    selectedCountry !== 'all',
    selectedYear !== 'all',
    sortBy !== 'name',
  ].filter(Boolean).length

  const hasActiveFilters = activeFiltersCount > 0

  const getDisplayLabel = (value: string | number): string => {
    if (value === 'all') return t('Filters.all')
    return String(value)
  }

  const isActive = (value: string | number, current: string | number) =>
    value === current

  const isAscending = sortDirection === 'asc'
  const sortDirectionLabel = t(
    isAscending ? 'Series.sort_asc' : 'Series.sort_desc'
  )
  const SortIcon: IconType = isAscending ? SortAscIcon : SortDescIcon

  const toggleSortDirection = () =>
    setSortDirection(isAscending ? 'desc' : 'asc')

  const renderPill = (
    value: string | number,
    label: string,
    currentValue: string | number,
    onClick: () => void
  ) => (
    <button
      className={
        isActive(value, currentValue)
          ? `${styles.pill} ${styles.pillActive}`
          : styles.pill
      }
      key={String(value)}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  )

  const renderSection = (
    title: string,
    icon: IconType,
    children: ReactNode
  ) => {
    const Icon = icon
    return (
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Icon size={16} />
          <Typography size="s" weight="semiBold">
            {title}
          </Typography>
        </div>
        <div className={styles.pillsList}>{children}</div>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <Dropdown
        className={styles.dropdown}
        menuClassName={styles.menu}
        trigger={
          <Button
            className={styles.triggerButton}
            isFullWidth={false}
            size="s"
            variation="regular"
          >
            <span className={styles.triggerIcon}>
              <FiltersIcon aria-hidden="true" focusable="false" size={16} />
            </span>
            <span className={styles.triggerLabel}>
              {t('Filters.toolbar_filters')}
            </span>
            <span
              className={`${styles.badge} ${
                hasActiveFilters ? styles.badgeVisible : ''
              }`}
            >
              {hasActiveFilters ? activeFiltersCount : null}
            </span>
          </Button>
        }
      >
        <div className={styles.header}>
          <button
            aria-label={t('Filters.clear')}
            className={styles.clear}
            disabled={!hasActiveFilters}
            title={t('Filters.clear')}
            type="button"
            onClick={hasActiveFilters ? clearFilters : undefined}
          >
            <ClearFiltersIcon aria-hidden="true" size={20} />
          </button>
          <button
            aria-label={sortDirectionLabel}
            className={styles.sortDirectionButton}
            title={sortDirectionLabel}
            type="button"
            onClick={toggleSortDirection}
          >
            <Typography size="xs" weight="semiBold">
              {t('Filters.toolbar_sort')}
            </Typography>
            <SortIcon aria-hidden="true" size={14} />
          </button>
        </div>
        {renderSection(
          t('Filters.genre'),
          GenreIcon,
          UI_GENRES.map(genre =>
            renderPill(genre, t(`Series.genre_${genre}`), selectedGenre, () =>
              setSelectedGenre(selectedGenre === genre ? 'all' : genre)
            )
          )
        )}

        {renderSection(
          t('Filters.country'),
          CountryIcon,
          UI_COUNTRIES.map(country =>
            renderPill(
              country,
              t(`Series.Country.${country}`),
              selectedCountry,
              () =>
                setSelectedCountry(
                  selectedCountry === country ? 'all' : country
                )
            )
          )
        )}

        {renderSection(
          t('Filters.year'),
          YearIcon,
          years.map(year =>
            renderPill(year, getDisplayLabel(year), selectedYear, () =>
              setSelectedYear(selectedYear === year ? 'all' : year)
            )
          )
        )}

        {renderSection(
          t('Filters.sort_by'),
          SortAscIcon,
          SORT_OPTIONS.map(option =>
            renderPill(option, t(`Series.sort_${option}`), sortBy, () =>
              setSortBy(option)
            )
          )
        )}
      </Dropdown>
    </div>
  )
}

export default SeriesToolbar
