'use client'
import React, { memo } from 'react'
import cn from 'classnames'
import styles from './SeriesSubtitles.module.scss'
import { useTranslations } from 'next-intl'
import Typography from '@/components/UI/Typography'
import Accordion from '@/components/Accordion'
import { useModal } from '@/hooks/useModal'
import EpisodesModal from '@/components/Modals/EpisodesModal'

export type SeriesEpisode = { episode: number; subtitleUrl: string }

export type SeriesSeason = { season: number; episodes: SeriesEpisode[] }

export type SeriesSubtitles = SeriesSeason[]

interface PropTypes {
  className?: string
  seriesName: string
  subtitles: SeriesSubtitles
}

const SeriesSubtitles = ({ className, subtitles, seriesName }: PropTypes) => {
  const t = useTranslations('Series')
  const { openModal, closeModal } = useModal()

  const handleOpenModal = (seasonNumber: number, episodes: SeriesEpisode[]) => {
    openModal({
      title: `${t('Subtitles.season', { count: seasonNumber })} — ${seriesName}`,
      content: (
        <EpisodesModal
          isOpen={true}
          onClose={closeModal}
          seasonNumber={seasonNumber}
          episodes={episodes}
        />
      ),
    })
  }

  if (!subtitles.length) return null

  return (
    <section className={cn(styles.root, className)}>
      <Accordion
        title={t('subtitles')}
        body={
          <ul className={styles.accordionBody}>
            {subtitles.map(({ season, episodes }) => {
              const hasEpisodes = episodes.length > 0
              return (
                <SeasonItem
                  key={season}
                  seasonNumber={season}
                  episodes={episodes}
                  isActive={hasEpisodes}
                  onOpen={handleOpenModal}
                />
              )
            })}
          </ul>
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
  onOpen: (seasonNumber: number, episodes: SeriesEpisode[]) => void
}

const SeasonItem = memo(
  ({ seasonNumber, episodes, isActive, onOpen }: SeasonItemProps) => {
    const t = useTranslations('Series.Subtitles')
    const isUnavailable = !isActive

    const handleClick = () => {
      if (!isActive) return
      onOpen(seasonNumber, episodes)
    }

    return (
      <li
        className={cn(styles.seasonItem, {
          [styles.isDisabled]: isUnavailable,
        })}
        onClick={handleClick}
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
      </li>
    )
  }
)
SeasonItem.displayName = 'SeasonItem'
