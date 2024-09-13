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
      <Typography tag="h2" weight="semiBold" size="s" className={styles.title}>
        {title}
      </Typography>
      <Typography size="xs">{body}</Typography>
    </span>
  )
}

export default SeriesDescription
