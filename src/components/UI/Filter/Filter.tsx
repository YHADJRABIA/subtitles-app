'use client'

import { Dropdown } from '@/components/UI/Dropdown'
import { Button } from '@/components/UI/Button'
import Typography from '@/components/UI/Typography'
import styles from './Filter.module.scss'
import cn from 'classnames'
import {
  PiSlidersHorizontal as FiltersIcon,
  PiSortAscending as SortAscIcon,
  PiSortDescending as SortDescIcon,
  PiFunnelXThin as ClearFiltersIcon,
} from 'react-icons/pi'
import type { IconType } from 'react-icons/lib'

export type FilterOption = {
  value: string | number
  label: string
}

export type FilterSection = {
  title: string
  icon: IconType
  options: FilterOption[]
  selectedValue: string | number | 'all'
  onSelect: (value: string | number | 'all') => void | Promise<unknown>
}

export type FilterProps = {
  sections: FilterSection[]
  activeFiltersCount: number
  triggerLabel?: string
  clearLabel?: string
  sortLabel?: string
  sortDirection?: 'asc' | 'desc'
  sortDirectionLabel?: string
  onClearFilters: () => void
  onToggleSortDirection?: () => void
}

/* TODO: REFACTOR */
function Filter({
  sections,
  activeFiltersCount,
  triggerLabel = 'Filters',
  clearLabel = 'Clear',
  sortLabel = 'Sort',
  sortDirection,
  sortDirectionLabel,
  onClearFilters,
  onToggleSortDirection,
}: FilterProps) {
  const hasActiveFilters = activeFiltersCount > 0
  const SortIcon: IconType | null =
    sortDirection === 'asc'
      ? SortAscIcon
      : sortDirection === 'desc'
        ? SortDescIcon
        : null

  return (
    <Dropdown
      className={styles.root}
      menuClassName={styles.menu}
      trigger={
        <Button
          className={styles.triggerButton}
          isFullWidth={false}
          size="s"
          variation="regular"
        >
          <FiltersIcon
            aria-hidden="true"
            className={styles.triggerIcon}
            focusable="false"
            size={16}
          />
          {triggerLabel}
          <span
            className={cn(styles.badge, {
              [styles.badgeVisible]: hasActiveFilters,
            })}
          >
            {hasActiveFilters ? activeFiltersCount : null}
          </span>
        </Button>
      }
    >
      <div className={styles.header}>
        <button
          aria-label={clearLabel}
          className={styles.clear}
          disabled={!hasActiveFilters}
          title={clearLabel}
          type="button"
          onClick={hasActiveFilters ? onClearFilters : undefined}
        >
          <ClearFiltersIcon aria-hidden="true" size={20} />
        </button>
        {onToggleSortDirection && SortIcon && (
          <button
            aria-label={sortDirectionLabel}
            className={styles.sortDirectionButton}
            title={sortDirectionLabel}
            type="button"
            onClick={onToggleSortDirection}
          >
            <Typography size="xs" weight="semiBold">
              {sortLabel}
            </Typography>
            <SortIcon aria-hidden="true" size={14} />
          </button>
        )}
      </div>
      {sections.map((section, idx) => {
        const Icon = section.icon
        return (
          <div className={styles.section} key={section.title || idx}>
            <div className={styles.sectionHeader}>
              <Icon size={16} />
              <Typography size="s" weight="semiBold">
                {section.title}
              </Typography>
            </div>
            <div className={styles.pillsList}>
              {section.options.map(option => (
                <button
                  className={cn(styles.pill, {
                    [styles.pillActive]: option.value === section.selectedValue,
                  })}
                  key={String(option.value)}
                  type="button"
                  onClick={() =>
                    section.onSelect(
                      section.selectedValue === option.value
                        ? 'all'
                        : option.value
                    )
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )
      })}
    </Dropdown>
  )
}

export default Filter
