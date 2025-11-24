'use client'

import React from 'react'
import styles from './Header.module.scss'
import Nav, { NavProps } from './Nav'
import Logo from './Logo'
import cn from 'classnames'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import SeriesSearchbar from '@/components/Searchbar/SeriesSearchbar'

interface PropTypes extends NavProps {
  isConcealable?: boolean
}

const Header = ({
  isConnected,
  userAvatar,
  className,
  isConcealable = false,
  showDashboardButton = false,
}: PropTypes) => {
  const scrollDirection = useScrollDirection()
  const isDownScroll = scrollDirection === 'down'
  const translateY = () => (isDownScroll ? '-100%' : 0)

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

        <Nav
          isConnected={isConnected}
          showDashboardButton={showDashboardButton}
          userAvatar={userAvatar}
        />
      </div>
    </header>
  )
}

export default Header
