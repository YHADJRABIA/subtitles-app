import React from 'react'
import styles from './SeriesOrigin.module.scss'
import cn from 'classnames'
import {
  PiChatCircleDotsThin as LanguageIcon,
  PiGlobeHemisphereEastThin as CountryIcon,
  PiCalendarDotsThin as YearIcon,
  PiTagThin as GenreIcon,
  PiTelevisionThin as SeasonsIcon,
} from 'react-icons/pi'

import Typography from '@/components/UI/Typography'
import { IconType } from 'react-icons/lib'
import { useTranslations } from 'next-intl'

/* TODO: relocate to types folder */
export type SeriesCountry = 'ru' | 'kz'
export type SeriesLanguage = 'ru' | 'kz'
export type SeriesGenre = 'comedy'
export type SeriesNumberOfSeasons = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

interface PropTypes {
  country: SeriesCountry
  language: SeriesLanguage
  releaseYear: number
  genre: SeriesGenre
  numberOfSeasons: SeriesNumberOfSeasons
  className?: string
}

const SeriesOrigin = ({
  country,
  language,
  releaseYear,
  genre,
  numberOfSeasons,
  className,
}: PropTypes) => {
  const t = useTranslations('Series')
  return (
    <section className={cn(styles.root, className)}>
      <div className={styles.row}>
        <Field
          icon={CountryIcon}
          value={t(`Country.${country}`)}
          title={t('Country.title')}
        />
        <Field
          icon={LanguageIcon}
          value={t(`Language.${language}`)}
          title={t('Language.title')}
        />
      </div>

      <div className={styles.row}>
        <Field
          icon={GenreIcon}
          value={t(`Genre.${genre}`)}
          title={t('Genre.title')}
        />
        <Field
          icon={YearIcon}
          value={String(releaseYear)}
          title={t('release_year')}
        />
      </div>

      <Field
        icon={SeasonsIcon}
        value={t('Seasons.number_of_seasons', { count: numberOfSeasons })}
        title={t('Seasons.title')}
      />
    </section>
  )
}

export default SeriesOrigin

const Field = ({
  icon: Icon,
  value,
  title,
}: {
  icon: IconType
  value: string
  title: string
}) => (
  <span className={styles.field}>
    <Icon className={styles.icon} size={20} title={title} />
    <Typography size="xs" weight="semiBold">
      {value}
    </Typography>
  </span>
)
