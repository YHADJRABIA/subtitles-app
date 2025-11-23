import React, { MouseEventHandler, ReactNode } from 'react'
import styles from './Dropdown.module.scss'
import cn from 'classnames'
import Typography from '../Typography'

interface PropTypes {
  children: ReactNode
  href?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  icon?: ReactNode
  className?: string
}

export const DropdownItem = ({
  children,
  href,
  onClick,
  disabled = false,
  icon,
  className,
}: PropTypes) => {
  const itemClasses = cn(styles.item, className)

  const content = (
    <>
      {icon && <span className={styles.itemIcon}>{icon}</span>}
      {children}
    </>
  )

  if (href) {
    return (
      <Typography className={itemClasses} link={{ href }} size="xs">
        {content}
      </Typography>
    )
  }

  return (
    <button
      className={itemClasses}
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      {content}
    </button>
  )
}
