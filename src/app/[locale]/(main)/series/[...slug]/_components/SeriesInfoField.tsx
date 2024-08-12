import React from 'react'
import cn from 'classnames'
import styles from './SeriesInfoField.module.scss'
import Typography from '@/components/UI/Typography'

interface PropTypes {
  className?: string
  label: string
  value: string
}

const SeriesInfoField = ({ className, label, value }: PropTypes) => {
  return (
    <span className={cn(styles.root, className)}>
      <Typography
        weight="semiBold"
        size="xs"
        align="left"
        className={styles.label}
      >
        {label}
      </Typography>
      <Typography size="xs" align="left" color="var(--tertiary-black-color)">
        {value}
      </Typography>
    </span>
  )
}

export default SeriesInfoField
