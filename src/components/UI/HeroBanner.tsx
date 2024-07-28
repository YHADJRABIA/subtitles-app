import React from 'react'
import styles from './HeroBanner.module.scss'

import cn from 'classnames'
import Typography from './Typography'

interface PropTypes {
  title: string
  description: string
  image?: string // TODO: update later according to design
  className?: string
}

const HeroBanner = ({ className, title, description }: PropTypes) => {
  return (
    <section className={cn(styles.root, className)}>
      <Typography tag="h1" weight="bold" className={styles.title}>
        {title}
      </Typography>
      <Typography className={styles.description} size="l">
        {description}
      </Typography>
    </section>
  )
}

export default HeroBanner
