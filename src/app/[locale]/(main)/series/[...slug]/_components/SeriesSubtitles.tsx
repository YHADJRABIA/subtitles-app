'use client'
import React from 'react'
import cn from 'classnames'
import styles from './SeriesSubtitles.module.scss'
import { useTranslations } from 'next-intl'
import Typography from '@/components/UI/Typography'
import Accordion from '@/components/Accordion'
import { downloadFile } from '@/utils/download'

export type SeriesEpisode = { episode: number; subtitleUrl: string }

export type SeriesSeason = { season: number; episodes: SeriesEpisode[] }

export type SeriesSubtitles = SeriesSeason[]

interface PropTypes {
  className?: string
  subtitles: SeriesSubtitles
}

const SeriesSubtitles = ({ className, subtitles }: PropTypes) => {
  const t = useTranslations('Series')

  if (!subtitles.length) return

  const numberOfAvailableSeasons = subtitles.length

  return (
    <section className={cn(styles.root, className)}>
      <Accordion
        title={t('subtitles')}
        body={
          <div className={styles.accordionBody}>
            {Array.from({ length: numberOfAvailableSeasons }, (_, idx) => {
              const hasEpisodes = !!subtitles[idx].episodes.length
              return (
                <SeasonItem
                  key={idx}
                  label={t('Subtitles.season', { count: idx + 1 })}
                  isActive={hasEpisodes}
                />
              )
            })}
          </div>
        }
      />
    </section>
  )
}

export default SeriesSubtitles

const SeasonItem = ({
  label,
  isActive,
}: {
  label: string
  isActive: boolean
}) => {
  const t = useTranslations('Series.Subtitles')
  const isUnavailable = !isActive
  /*   const downloadEpisode = (link, filename) =>
    downloadFile('/assets/subs/Patrul-s01-ep01.srt', 'Patrul-s01-ep01.srt') */

  return (
    <div
      className={cn(styles.seasonItem, { [styles.isDisabled]: isUnavailable })}
    >
      <Typography
        align="left"
        tag="h4"
        weight="semiBold"
        size="xs"
        color="var(--primary-white-color)"
        title={isUnavailable ? t('not_available_yet') : undefined}
        /*         onClick={() => downloadEpisode('link', 'filename')} */
      >
        {label}
      </Typography>
    </div>
  )
}
