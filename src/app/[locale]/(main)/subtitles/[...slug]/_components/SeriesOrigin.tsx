import React from 'react'
import styles from './SeriesOrigin.module.scss'
import cn from 'classnames'
import {
  PiChatCircleDotsThin as LanguageIcon,
  PiGlobeHemisphereEastLight as CountryIcon,
  PiCalendarDotsThin as YearIcon,
} from 'react-icons/pi'
import Typography from '@/components/UI/Typography'
import { IconType } from 'react-icons/lib'
import { useTranslations } from 'next-intl'

type Country = 'Kazakhstan' | 'Russia'
type Language = 'Russian' | 'Kazakh'

interface PropTypes {
  country: Country
  language: Language
  releaseYear: number
  className?: string
}

const SeriesOrigin = ({
  country,
  language,
  releaseYear,
  className,
}: PropTypes) => {
  const t = useTranslations('Series')
  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.top}>
        <Field icon={CountryIcon} value={country} title={t('country')} />
        <Field
          icon={YearIcon}
          value={String(releaseYear)}
          title={t('release_year')}
        />
      </div>
      <Field icon={LanguageIcon} value={language} title={t('language')} />
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
    <Icon className={styles.icon} size={22} title={title} />
    <Typography size="xs" weight="semiBold">
      {value}
    </Typography>
  </span>
)
