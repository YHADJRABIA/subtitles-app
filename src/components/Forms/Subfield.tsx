import React from 'react'
import styles from './Subfield.module.scss'
import { MdErrorOutline as ErrorIcon } from 'react-icons/md'
import cn from 'classnames'
import Typography from '../UI/Typography'

interface PropTypes {
  label?: string
  isError?: boolean
  isShown: boolean
  className?: string
}

const Subfield = ({ label, isError, isShown, className }: PropTypes) => {
  return (
    <div
      className={cn(
        styles.root,
        'hidden',
        {
          visible: isShown,
        },
        className
      )}
    >
      {isError && <ErrorIcon className={styles.errorIcon} />}
      <Typography
        className={styles.text}
        color={isError ? 'var(--primary-red-color)' : undefined}
        size="xxs"
        tag="small"
        title={label}
      >
        {label}
      </Typography>
    </div>
  )
}

export default Subfield
