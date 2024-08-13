'use client'
import React, { memo } from 'react'
import cn from 'classnames'
import styles from './SeriesSubtitles.module.scss'
import { useTranslations } from 'next-intl'
import Typography from '@/components/UI/Typography'
import Accordion from '@/components/Accordion'
import { downloadFile } from '@/utils/download'
import { formatNumber } from '@/utils/string'

export type SeriesEpisode = { episode: number; subtitleUrl: string }

export type SeriesSeason = { season: number; episodes: SeriesEpisode[] }

export type SeriesSubtitles = SeriesSeason[]

interface PropTypes {
  className?: string
  subtitles: SeriesSubtitles
}

const SeriesSubtitles = ({ className, subtitles }: PropTypes) => {
  const t = useTranslations('Series')

  if (!subtitles.length) return null

  return (
    <section className={cn(styles.root, className)}>
      <Accordion
        title={t('subtitles')}
        body={
          <div className={styles.accordionBody}>
            {subtitles.map(({ season, episodes }) => {
              const hasEpisodes = episodes.length > 0
              return (
                <SeasonItem
                  key={season}
                  seasonNumber={season}
                  episodes={episodes}
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

interface SeasonItemProps {
  seasonNumber: number
  episodes: SeriesEpisode[]
  isActive: boolean
}

const SeasonItem = memo(
  ({ seasonNumber, episodes, isActive }: SeasonItemProps) => {
    const t = useTranslations('Series.Subtitles')
    const isUnavailable = !isActive
    return (
      <div
        className={cn(styles.seasonItem, {
          [styles.isDisabled]: isUnavailable,
        })}
      >
        <Typography
          align="left"
          tag="h4"
          weight="semiBold"
          size="xs"
          color="var(--primary-white-color)"
          title={isUnavailable ? t('not_available_yet') : undefined}
        >
          {t('season', { count: seasonNumber })}
        </Typography>
        {isActive && (
          <div className={styles.episodeList}>
            {episodes.map(({ episode, subtitleUrl }) => (
              <EpisodeItem
                key={episode}
                episodeNumber={episode}
                seasonNumber={seasonNumber}
                subtitleUrl={subtitleUrl}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
)
SeasonItem.displayName = 'SeasonItem'

interface EpisodeItemProps {
  episodeNumber: number
  seasonNumber: number
  subtitleUrl: string
}

const EpisodeItem = ({
  episodeNumber,
  subtitleUrl,
  seasonNumber,
}: EpisodeItemProps) => {
  const t = useTranslations('Series.Subtitles')

  const filename = `s${formatNumber(seasonNumber)}-ep${formatNumber(episodeNumber)}.srt`

  const handleDownload = () => {
    downloadFile(subtitleUrl, filename)
  }

  return (
    <div className={styles.episodeItem} onClick={handleDownload}>
      <Typography
        align="left"
        weight="normal"
        size="xs"
        color="var(--primary-white-color)"
      >
        {t('episode', { count: episodeNumber })}
      </Typography>
    </div>
  )
}
