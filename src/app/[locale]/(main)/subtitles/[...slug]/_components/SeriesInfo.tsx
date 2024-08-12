import React from 'react'
import cn from 'classnames'
import styles from './SeriesInfo.module.scss'
import { useTranslations } from 'next-intl'
import SeriesInfoField from './SeriesInfoField'

type NumberOfSeasons = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
type Genre = 'Comedy'

interface PropTypes {
  genre: Genre
  NumberOfSeasons: NumberOfSeasons
  directors: string
  actors: string
  className?: string
}

const SeriesInfo = ({
  className,
  genre,
  NumberOfSeasons,
  directors,
  actors,
}: PropTypes) => {
  const t = useTranslations('Series')
  return (
    <section className={cn(styles.root, className)}>
      <SeriesInfoField label={t('genre')} value={genre} />
      <SeriesInfoField label={t('number_of_seasons')} value={NumberOfSeasons} />
      <SeriesInfoField label={t('actors')} value={actors} />
      <SeriesInfoField label={t('director')} value={directors} />
    </section>
  )
}

export default SeriesInfo
