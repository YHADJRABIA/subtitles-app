'use client'
import React, { memo } from 'react'
import cn from 'classnames'
import styles from './SeriesSubtitles.module.scss'
import { useTranslations } from 'next-intl'
import Typography from '@/components/UI/Typography'
import Accordion from '@/components/Accordion'
import { useModal } from '@/hooks/useModal'
import EpisodesModal from '@/components/Modals/EpisodesModal'
import {
  SeriesEpisode,
  SeriesSubtitles as SeriesSubtitlesType,
} from '@/types/series'
import { colors } from '@/utils/color'

interface PropTypes {
  className?: string
  seriesName: string
  subtitles: SeriesSubtitlesType
  shownAmountOfSeasons: number
}

const SeriesSubtitles = ({
  className,
  subtitles,
  seriesName,
  shownAmountOfSeasons,
}: PropTypes) => {
  const t = useTranslations('Series')
  const { openModal } = useModal()

  const handleOpenModal = (seasonNumber: number, episodes: SeriesEpisode[]) => {
    openModal({
      title: `${t('Subtitles.season', { count: seasonNumber })} — ${seriesName}`,
      content: <EpisodesModal episodes={episodes} />,
    })
  }

  // Generate an array of seasons from 1 to numberOfSeasons
  const seasonsArray = Array.from(
    { length: shownAmountOfSeasons },
    (_, i) => i + 1
  )

  return (
    <section className={cn(styles.root, className)}>
      <Accordion
        body={
          <ul className={styles.accordionBody}>
            {seasonsArray.map(seasonNumber => {
              const seasonData = subtitles.find(
                subtitle => subtitle.seasonNumber === seasonNumber
              )
              const episodes = seasonData?.episodes ?? []
              const hasEpisodes = episodes.length > 0

              return (
                <SeasonItem
                  episodes={episodes}
                  isActive={hasEpisodes}
                  key={seasonNumber}
                  seasonNumber={seasonNumber}
                  onOpen={handleOpenModal}
                />
              )
            })}
          </ul>
        }
        title={t('subtitles')}
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
      <li // TODO: refactor with Button and add rounded prop?
        className={cn(styles.seasonItem, {
          [styles.isDisabled]: isUnavailable,
        })}
        onClick={handleClick}
      >
        <Typography
          color={colors.white.primary}
          size="xs"
          tag="h4"
          title={isUnavailable ? t('not_available_yet') : undefined}
          weight="semiBold"
        >
          {t('season', { count: seasonNumber })}
        </Typography>
      </li>
    )
  }
)
SeasonItem.displayName = 'SeasonItem'
