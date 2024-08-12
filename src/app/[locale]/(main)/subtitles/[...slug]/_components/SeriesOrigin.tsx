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
  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.top}>
        <Field icon={CountryIcon} value={country} />
        <Field icon={YearIcon} value={String(releaseYear)} />
      </div>
      <Field icon={LanguageIcon} value={language} />
    </div>
  )
}

export default SeriesOrigin

const Field = ({ icon: Icon, value }: { icon: IconType; value: string }) => (
  <span className={styles.field}>
    <Icon className={styles.icon} size={22} />
    <Typography size="xs" weight="semiBold">
      {value}
    </Typography>
  </span>
)
