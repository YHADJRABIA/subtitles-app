import React from 'react'
import cn from 'classnames'
import styles from './SeriesTrailer.module.scss'
import Video from '@/components/Video'
import Typography from '@/components/UI/Typography'
import { useTranslations } from 'next-intl'

interface PropTypes {
  className?: string
  src: string
  captionsSrc: string
  thumbnail?: string
}

const SeriesTrailer = ({
  src,
  captionsSrc,
  thumbnail,
  className,
}: PropTypes) => {
  const t = useTranslations('Series')
  if (!src.length || !captionsSrc.length) return
  return (
    <section className={cn(styles.root, className)}>
      <Typography
        tag="h3"
        weight="semiBold"
        align="left"
        size="s"
        className={styles.title}
      >
        {t('trailer')}
      </Typography>
      <Video
        videoSrc={src}
        captionsSrc={captionsSrc}
        thumbnailSrc={thumbnail}
      />
    </section>
  )
}

export default SeriesTrailer
