import React from 'react'
import cn from 'classnames'
import styles from './SeriesTrailer.module.scss'
import Typography from '@/components/UI/Typography'
import { useTranslations } from 'next-intl'
import VideoPlayer from '@/components/DatoCMS/VideoPlayer'
import { VideoPlayerType } from '@/types/fragment'

interface PropTypes {
  className?: string
  videoData?: VideoPlayerType
  thumbnail?: string
}

const SeriesTrailer = ({ videoData, thumbnail, className }: PropTypes) => {
  const t = useTranslations('Series')
  if (!videoData) return

  return (
    <section className={cn(styles.root, className)}>
      <Typography size="s" tag="h3" weight="semiBold">
        {t('trailer')}
      </Typography>
      <VideoPlayer
        className={styles.video}
        data={videoData}
        poster={thumbnail}
      />
    </section>
  )
}

export default SeriesTrailer
