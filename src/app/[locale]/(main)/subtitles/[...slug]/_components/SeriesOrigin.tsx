import React from 'react'
import styles from './SeriesOrigin.module.scss'
import cn from 'classnames'
import {
  PiChatCircleDotsThin as LanguageIcon,
  PiGlobeHemisphereEastThin as CountryIcon,
  PiCalendarDotsThin as YearIcon,
  PiTagThin as GenreIcon,
} from 'react-icons/pi'
import Typography from '@/components/UI/Typography'
import { IconType } from 'react-icons/lib'
import { useTranslations } from 'next-intl'

/* TODO: relocate to types folder */
type Country = 'kz' | 'ru'
type Language = 'ru' | 'kz'
type Genre = 'comedy'

interface PropTypes {
  country: Country
  language: Language
  releaseYear: number
  genre: Genre
  className?: string
}

const SeriesOrigin = ({
  country,
  language,
  releaseYear,
  genre,
  className,
}: PropTypes) => {
  const t = useTranslations('Series')
  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.row}>
        <Field
          icon={CountryIcon}
          value={t(`Country.${country}`)}
          title={t('Country.title')}
        />
        <Field
          icon={YearIcon}
          value={String(releaseYear)}
          title={t('release_year')}
        />
      </div>

      <Field
        icon={LanguageIcon}
        value={t(`Language.${language}`)}
        title={t('Language.title')}
      />
      <Field
        icon={GenreIcon}
        value={t(`Genre.${genre}`)}
        title={t('Genre.title')}
      />
    </div>
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
