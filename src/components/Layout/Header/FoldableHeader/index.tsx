'use client'
import React from 'react'
import styles from './FoldableHeader.module.scss'
import Header from '..'
import cn from 'classnames'
import { useScrollDirection } from '@/hooks/useScrollDirection'

interface PropTypes {
  isConnected: boolean
  className?: string
}

/* Conceals itself on down-scroll and reappears on up-scroll */
const FoldableHeader = ({ isConnected, className }: PropTypes) => {
  const scrollDirection = useScrollDirection()
  const isDownScroll = scrollDirection === 'down'

  return (
    <Header
      className={cn(styles.root, className, { [styles.hidden]: isDownScroll })} // Fix glitch of header disappearing instantly because of instant class removal
      isConnected={isConnected}
    />
  )
}

export default FoldableHeader
