import React from 'react'
import styles from './Separator.module.scss'
import cn from 'classnames'

type PropTypes =
  | { label: string; color?: false }
  | { color?: string; label?: false }

/**
 * Horizontal line.
 * Continuous if no label provided.
 * With gap in the middle if label provided.
 */
const Separator = ({
  label,
  color,
  className,
}: PropTypes & { className?: string }) => {
  return label ? (
    <div className={cn(styles.root, styles.labelSeparator, className)}>
      <span>{label}</span>
    </div>
  ) : (
    <hr
      className={cn(styles.root, className)}
      style={{ borderColor: color || undefined }}
    />
  )
}

export default Separator
