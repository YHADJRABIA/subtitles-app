import React from 'react'
import styles from './SeriesHighlights.module.scss'
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
import {
  SeriesCountry,
  SeriesGenre,
  SeriesLanguage,
  SeriesNumberOfSeasons,
} from '@/types/series'

interface PropTypes {
  country: SeriesCountry
  language: SeriesLanguage
  releaseYear: number
  genre: SeriesGenre
  numberOfSeasons: SeriesNumberOfSeasons
  className?: string
}

const SeriesHighlights = ({
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
          title={t('Country.title')}
          value={t(`Country.${country}`)}
        />
        <Field
          icon={LanguageIcon}
          title={t('Language.title')}
          value={t(`Language.${language}`)}
        />
      </div>

      <div className={styles.row}>
        <Field
          icon={GenreIcon}
          title={t('Genre.title')}
          value={t(`Genre.${genre}`)}
        />
        <Field
          icon={YearIcon}
          title={t('release_year')}
          value={String(releaseYear)}
        />
      </div>

      <Field
        icon={SeasonsIcon}
        title={t('Seasons.title')}
        value={t('Seasons.number_of_seasons', { count: numberOfSeasons })}
      />
    </section>
  )
}

export default SeriesHighlights

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
    <Icon size={20} title={title} />
    <Typography size="xs" weight="semiBold">
      {value}
    </Typography>
  </span>
)
