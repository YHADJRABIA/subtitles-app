import React from 'react'
import styles from './Separator.module.scss'

type PropTypes =
  | { label: string; color?: false }
  | { color?: string; label?: false }

/**
 * Horizontal line.
 * Continuous if no label provided.
 * With gap in the middle if label provided.
 */
const Separator = ({ label, color }: PropTypes) => {
  return label ? (
    <div className={styles.labelSeparator}>
      <span>{label}</span>
    </div>
  ) : (
    <hr
      className={styles.separator}
      style={{ borderColor: color || 'var(--primary-black-color)' }}
    />
  )
}

export default Separator
