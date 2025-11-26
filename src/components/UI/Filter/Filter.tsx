'use client'

import { ReactNode } from 'react'
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

export type FilterOption<TValue extends string | number = string | number> = {
  value: TValue
  label: string
}

export type FilterSection<TValue extends string | number = string | number> = {
  title: string
  icon: IconType
  options: FilterOption<TValue>[]
  selectedValue: TValue | 'all'
  onSelect: (value: TValue | 'all') => void | Promise<unknown>
}

export type FilterProps<TValue extends string | number = string | number> = {
  sections: FilterSection<TValue>[]
  activeFiltersCount: number
  triggerLabel?: string
  clearLabel?: string
  sortLabel?: string
  sortDirection?: 'asc' | 'desc'
  sortDirectionLabel?: string
  onClearFilters: () => void
  onToggleSortDirection?: () => void
}

const isActive = <TValue extends string | number>(
  value: TValue,
  current: TValue | 'all'
) => value === current

function Filter<TValue extends string | number = string | number>({
  sections,
  activeFiltersCount,
  triggerLabel = 'Filters',
  clearLabel = 'Clear',
  sortLabel = 'Sort',
  sortDirection,
  sortDirectionLabel,
  onClearFilters,
  onToggleSortDirection,
}: FilterProps<TValue>) {
  const hasActiveFilters = activeFiltersCount > 0
  const SortIcon: IconType | null =
    sortDirection === 'asc'
      ? SortAscIcon
      : sortDirection === 'desc'
        ? SortDescIcon
        : null

  const renderPill = (
    value: TValue,
    label: string,
    currentValue: TValue | 'all',
    onClick: () => void
  ) => (
    <button
      className={cn(styles.pill, {
        [styles.pillActive]: isActive(value, currentValue),
      })}
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
    children: ReactNode,
    key: string | number
  ) => {
    const Icon = icon
    return (
      <div className={styles.section} key={key}>
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
            <FiltersIcon
              aria-hidden="true"
              className={styles.triggerIcon}
              focusable="false"
              size={16}
            />
            <span className={styles.triggerLabel}>{triggerLabel}</span>
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
        {sections.map((section, idx) =>
          renderSection(
            section.title,
            section.icon,
            section.options.map(option =>
              renderPill(
                option.value,
                option.label,
                section.selectedValue,
                () =>
                  section.onSelect(
                    section.selectedValue === option.value
                      ? 'all'
                      : option.value
                  )
              )
            ),
            section.title || idx
          )
        )}
      </Dropdown>
    </div>
  )
}

export default Filter
