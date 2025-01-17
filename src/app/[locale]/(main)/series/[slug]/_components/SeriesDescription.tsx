import Typography from '@/components/UI/Typography'
import styles from './SeriesDescription.module.scss'
import React from 'react'

interface PropTypes {
  title: string
  body: string
  className?: string
}

const SeriesDescription = ({ className, title, body }: PropTypes) => {
  return (
    <span className={className}>
      <Typography className={styles.title} size="s" tag="h2" weight="semiBold">
        {title}
      </Typography>
      <Typography size="xs">{body}</Typography>
    </span>
  )
}

export default SeriesDescription
