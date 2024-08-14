'use client'

import React, { ReactNode } from 'react'
import styles from './StickyContainer.module.scss'
import cn from 'classnames'
import { useScrollDirection } from '@/hooks/useScrollDirection'

interface PropTypes {
  children: ReactNode
  className?: string
}

const StickyContainer = ({ children, className }: PropTypes) => {
  const scrollDirection = useScrollDirection()
  const isHeaderVisible = scrollDirection === 'up'

  // Calculate top value based on header's visibility
  const topValue = isHeaderVisible
    ? `calc(var(--page-padding) + var(--header-height))`
    : 'var(--page-padding)'

  return (
    <div className={cn(styles.root, className)} style={{ top: topValue }}>
      {children}
    </div>
  )
}

export default StickyContainer
