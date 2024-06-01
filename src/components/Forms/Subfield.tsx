import React from 'react'
import styles from './Subfield.module.scss'
import { MdErrorOutline as ErrorIcon } from 'react-icons/md'
import cn from 'classnames'

interface PropTypes {
  label?: string
  hasIcon?: boolean
  isShown: boolean
}

const Subfield = ({ label, hasIcon, isShown }: PropTypes) => {
  return (
    <div
      className={cn(styles.root, 'hidden', {
        visible: isShown,
      })}
    >
      {hasIcon && <ErrorIcon size={14} className={styles.errorIcon} />}
      <small
        className={styles.text}
        style={{
          color: hasIcon ? 'var(--primary-red-color)' : undefined,
        }}
        title={label}
      >
        {label}
      </small>
    </div>
  )
}

export default Subfield
