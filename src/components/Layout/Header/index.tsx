'use client'

import React, { useState } from 'react'
import styles from './Header.module.scss'
import Nav from './Nav'
import Logo from './Logo'
import cn from 'classnames'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import Searchbar from '@/components/Searchbar'
import { useTranslations } from 'next-intl'

interface PropTypes {
  isConnected: boolean
  className?: string
  isConcealable?: boolean
}

const Header = ({
  isConnected,
  className,
  isConcealable = false,
}: PropTypes) => {
  const t = useTranslations('Series')
  const scrollDirection = useScrollDirection()
  const isDownScroll = scrollDirection === 'down'
  const translateY = () => (isDownScroll ? '-100%' : 0)

  const [mobileQuery, setMobileQuery] = useState('')

  return (
    <header
      className={cn(styles.root, className)}
      style={
        isConcealable ? { transform: `translateY(${translateY()})` } : undefined
      }
    >
      <Logo isInvertedColor size={50} />

      <div className={styles.container}>
        <Searchbar
          isFoldable
          className={styles.searchbar}
          placeholder={t('search_placeholder')}
          value={mobileQuery}
          onChange={setMobileQuery}
        />

        <Nav isConnected={isConnected} />
      </div>
    </header>
  )
}

export default Header
