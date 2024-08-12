import React from 'react'
import cn from 'classnames'
import styles from './SeriesInfo.module.scss'
import { useTranslations } from 'next-intl'
import SeriesInfoField from './SeriesInfoField'
import { ArrayToString } from '@/utils/array'

interface PropTypes {
  directors: string[]
  actors: string[]
  className?: string
}

const SeriesInfo = ({ className, directors, actors }: PropTypes) => {
  const t = useTranslations('Series')
  return (
    <section className={cn(styles.root, className)}>
      <SeriesInfoField
        label={t('director', { count: directors.length })}
        value={ArrayToString(directors)}
      />
      <SeriesInfoField
        label={t('actors', { count: actors.length })}
        value={ArrayToString(actors)}
      />
    </section>
  )
}

export default SeriesInfo
