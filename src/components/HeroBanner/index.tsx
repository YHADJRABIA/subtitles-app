import React, { ReactNode } from 'react'
import styles from './HeroBanner.module.scss'
import Typography from '../UI/Typography'
import cn from 'classnames'
import FilledImage, { AspectRatio } from '../UI/FilledImage'

interface PropTypes {
  title: string
  description: string
  align?: 'left' | 'center' | 'right'
  image?: string
  imageAlt?: string
  className?: string
  ctaElements?: ReactNode
  imageAspectRatio?: AspectRatio
}

const HeroBanner = ({
  className,
  title,
  align = 'center',
  image,
  imageAlt,
  imageAspectRatio,
  ctaElements,
  description,
}: PropTypes) => {
  return (
    <section className={cn(styles.root, className)}>
      {image && (
        <FilledImage
          alt={imageAlt ?? ''}
          aspectRatio={imageAspectRatio}
          className={styles.image}
          src={image}
        />
      )}

      {/* TODO: Limit text length */}
      <div className={styles.textContainer}>
        <Typography
          align={align}
          className={styles.title}
          lineHeight="narrow"
          tag="h1"
          weight="bold"
        >
          {title}
        </Typography>
        <Typography align={align} className={styles.description}>
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
