import React, { ReactNode } from 'react'
import styles from './HeroBanner.module.scss'

import cn from 'classnames'
import Typography from './Typography'
import Image from 'next/image'

interface PropTypes {
  title: string
  description: string
  align?: 'left' | 'center' | 'right'
  image?: string
  imageAlt?: string
  className?: string
  ctaElements?: ReactNode
}

const HeroBanner = ({
  className,
  title,
  align = 'center',
  image,
  imageAlt,
  ctaElements,
  description,
}: PropTypes) => {
  return (
    <section className={cn(styles.root, className)}>
      {image && (
        <div className={styles.image}>
          <Image src={image} fill alt={imageAlt ?? ''} />
        </div>
      )}

      {/* TODO: Limit text length */}
      <div className={styles.textContainer}>
        <Typography
          tag="h1"
          weight="bold"
          align={align}
          className={styles.title}
        >
          {title}
        </Typography>
        <Typography size="l" align={align} className={styles.description}>
          {description}
        </Typography>

        {ctaElements && (
          <div className={styles.ctaContainer}>{ctaElements}</div>
        )}
      </div>
    </section>
  )
}

export default HeroBanner
