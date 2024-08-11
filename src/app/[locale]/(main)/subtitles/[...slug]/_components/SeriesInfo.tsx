import React from 'react'
import cn from 'classnames'
import styles from './SeriesInfo.module.scss'
import { useTranslations } from 'next-intl'
import SeriesInfoField from './SeriesInfoField'

type Country = 'Kazakhstan' | 'Russia'
type Language = 'Russian' | 'Kazakh'
type NumberOfSeasons = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
type Genre = 'Comedy'

interface PropTypes {
  country: Country
  releaseYear: string
  genre: Genre
  NumberOfSeasons: NumberOfSeasons
  language: Language
  directors: string
  actors: string
  className?: string
}

const SeriesInfo = ({
  className,
  country,
  releaseYear,
  genre,
  NumberOfSeasons,
  language,
  directors,
  actors,
}: PropTypes) => {
  const t = useTranslations('Series')
  return (
    <section className={cn(styles.root, className)}>
      <SeriesInfoField label={t('country')} value={country} />
      <SeriesInfoField label={t('language')} value={language} />
      <SeriesInfoField label={t('release_year')} value={releaseYear} />
      <SeriesInfoField label={t('genre')} value={genre} />
      <SeriesInfoField label={t('number_of_seasons')} value={NumberOfSeasons} />
      <SeriesInfoField label={t('actors')} value={actors} />
      <SeriesInfoField label={t('director')} value={directors} />
    </section>
  )
}

export default SeriesInfo
