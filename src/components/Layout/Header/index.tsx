'use client'
import React from 'react'
import styles from './Header.module.scss'
import Nav from './Nav'
import Logo from './Logo'
import cn from 'classnames'
import { useScrollDirection } from '@/hooks/useScrollDirection'

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
      <Nav className={styles.nav} isConnected={isConnected} />
    </header>
  )
}

export default Header
