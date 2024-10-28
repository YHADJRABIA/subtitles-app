import React from 'react'
import cn from 'classnames'
import styles from './SeriesCast.module.scss'
import { useTranslations } from 'next-intl'
import { ArrayToString } from '@/utils/array'
import Typography from '@/components/UI/Typography'

interface PropTypes {
  directors: string[]
  actors: string[]
  className?: string
}

const SeriesCast = ({ className, directors, actors }: PropTypes) => {
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

export default SeriesCast

const Field = ({ label, value }: { label: string; value: string }) => {
  return (
    <span className={styles.field}>
      <Typography size="xs" weight="semiBold">
        {label}
      </Typography>
      <Typography className={styles.label} size="xs">
        {value}
      </Typography>
    </span>
  )
}
