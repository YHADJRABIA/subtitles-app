import React from 'react'
import cn from 'classnames'
import styles from './SeriesInfo.module.scss'
import { useTranslations } from 'next-intl'
import { ArrayToString } from '@/utils/array'
import Typography from '@/components/UI/Typography'

interface PropTypes {
  directors: string[]
  actors: string[]
  className?: string
}

const SeriesInfo = ({ className, directors, actors }: PropTypes) => {
  const t = useTranslations('Series')
  return (
    <section className={cn(styles.root, className)}>
      <Field
        label={t('director', { count: directors.length })}
        value={ArrayToString(directors)}
      />
      <Field
        label={t('actors', { count: actors.length })}
        value={ArrayToString(actors)}
      />
    </section>
  )
}

export default SeriesInfo

const Field = ({ label, value }: { label: string; value: string }) => {
  return (
    <span className={styles.field}>
      <Typography weight="semiBold" size="xs" className={styles.label}>
        {label}
      </Typography>
      <Typography size="xs" color="var(--tertiary-black-color)">
        {value}
      </Typography>
    </span>
  )
}
