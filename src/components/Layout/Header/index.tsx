'use client'

import React from 'react'
import styles from './Header.module.scss'
import Nav, { NavProps } from './Nav'
import Logo from './Logo'
import cn from 'classnames'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import Searchbar from '@/components/Searchbar'
import { useTranslations } from 'next-intl'
import { Series } from '@/types/series'
import SeriesSuggestion from '@/components/Searchbar/SeriesSuggestion'
import { useSeriesSearch } from '@/hooks/useSeriesSearch'

interface PropTypes extends NavProps {
  isConcealable?: boolean
}

const Header = ({
  isConnected,
  userAvatar,
  className,
  isConcealable = false,
}: PropTypes) => {
  const t = useTranslations('Series')
  const scrollDirection = useScrollDirection()
  const isDownScroll = scrollDirection === 'down'
  const translateY = () => (isDownScroll ? '-100%' : 0)

  const { query, setQuery, suggestions, isLoading, clearSearch } =
    useSeriesSearch()
  const SeriesSearchbar = ({
    isFoldable,
    className,
  }: {
    isFoldable?: boolean
    className: string
  }) => (
    <Searchbar
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

  return (
    <header
      className={cn(styles.root, className)}
      style={
        isConcealable ? { transform: `translateY(${translateY()})` } : undefined
      }
    >
      <Logo isInvertedColor size={50} />

      {/* Desktop */}
      <SeriesSearchbar className={styles.searchbarDesktop} />

      <div className={styles.container}>
        {/* Mobile */}
        <SeriesSearchbar isFoldable className={styles.searchbarMobile} />

        <Nav isConnected={isConnected} userAvatar={userAvatar} />
      </div>
    </header>
  )
}

export default Header
