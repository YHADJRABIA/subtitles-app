import React from 'react'
import cn from 'classnames'
import styles from './SeriesInfo.module.scss'
import { useTranslations } from 'next-intl'
import SeriesInfoField from './SeriesInfoField'
import { joinWithComma } from '@/utils/array'

type NumberOfSeasons = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

interface PropTypes {
  directors: string[]
  actors: string[]
  numberOfSeaons: NumberOfSeasons
  className?: string
}

const SeriesInfo = ({
  className,
  directors,
  actors,
  numberOfSeaons,
}: PropTypes) => {
  const t = useTranslations('Series')
  return (
    <section className={cn(styles.root, className)}>
      <SeriesInfoField
        label={t('Seasons.title')}
        value={String(numberOfSeaons)}
      />
      <SeriesInfoField
        label={t('actors', { count: actors.length })}
        value={joinWithComma(actors)}
      />
      <SeriesInfoField
        label={t('director', { count: directors.length })}
        value={joinWithComma(directors)}
      />
    </section>
  )
}

export default SeriesInfo
