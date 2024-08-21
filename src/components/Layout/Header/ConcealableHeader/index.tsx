'use client'
import React from 'react'
import styles from './ConcealableHeader.module.scss'
import Header from '..'
import cn from 'classnames'
import { useScrollDirection } from '@/hooks/useScrollDirection'

interface PropTypes {
  isConnected: boolean
  className?: string
}

/* Conceals itself on down-scroll and reappears on up-scroll */
const ConcealableHeader = ({ isConnected, className }: PropTypes) => {
  const scrollDirection = useScrollDirection()
  const isDownScroll = scrollDirection === 'down'

  const translateY = () => (isDownScroll ? '-100%' : 0)

  return (
    <Header
      className={cn(styles.root, className)} // Fix glitch of header disappearing instantly because of instant class removal
      customStyle={{ transform: `translateY(${translateY()})` }}
      isConnected={isConnected}
    />
  )
}

export default ConcealableHeader
