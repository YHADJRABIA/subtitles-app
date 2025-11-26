import React, { ReactNode } from 'react'
import styles from './Dropdown.module.scss'
import cn from 'classnames'

interface PropTypes {
  trigger: ReactNode
  children: ReactNode
  className?: string
  menuClassName?: string
  align?: 'left' | 'right'
}

export const Dropdown = ({
  children,
  className,
  menuClassName,
  trigger,
}: PropTypes) => {
  return (
    <div aria-label="Dropdown menu" className={cn(styles.root, className)}>
      <div className={styles.trigger}>{trigger}</div>
      <div className={cn(styles.menu, menuClassName)} role="menu">
        {children}
      </div>
    </div>
  )
}
