import React from 'react'
import styles from './HeroBanner.module.scss'

import cn from 'classnames'
import Typography from './Typography'

interface PropTypes {
  title: string
  description: string
  align?: 'left' | 'center' | 'right'
  image?: string // TODO: update later according to design
  className?: string
}

const HeroBanner = ({
  className,
  title,
  align = 'center',
  description,
}: PropTypes) => {
  return (
    <section className={cn(styles.root, className)}>
      <Typography tag="h1" weight="bold" align={align} className={styles.title}>
        {title}
      </Typography>
      <Typography size="l" align={align} className={styles.description}>
        {description}
      </Typography>
    </section>
  )
}

export default HeroBanner
