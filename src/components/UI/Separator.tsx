import React from 'react'
import styles from './Separator.module.scss'

interface PropTypes {
  label?: string
}

/**
 * Horizontal line.
 * Continuous if no label provided.
 * With gap in the middle if label provided.
 */
const Separator = ({ label }: PropTypes) => {
  return label ? (
    <div className={styles.separator}>
      <span>{label}</span>
    </div>
  ) : (
    <hr />
  )
}

export default Separator
