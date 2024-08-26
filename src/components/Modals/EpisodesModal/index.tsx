import React from 'react'
import Typography from '@/components/UI/Typography'

import styles from './EpisodesModal.module.scss'
import { downloadFile } from '@/utils/download'
import { useTranslations } from 'next-intl'
import { SeriesEpisode } from '@/types/series'
import { Button } from '@/components/UI/Button'

interface PropTypes {
  seasonNumber: number
  episodes: SeriesEpisode[]
}

const EpisodesModal = ({ seasonNumber, episodes }: PropTypes) => {
  const t = useTranslations('Series')

  const handleDownload = (subtitleUrl: string, episodeNumber: number) => {
    const filename = `s${String(seasonNumber).padStart(2, '0')}-ep${String(episodeNumber).padStart(2, '0')}.srt`
    downloadFile(subtitleUrl, filename)
  }

  return (
    <ul className={styles.root}>
      {episodes.map(({ episode, subtitleUrl }) => (
        <li key={episode} className={styles.item}>
          <Typography size="xs" weight="semiBold" className={styles.label}>
            {t('Subtitles.episode', { count: episode })}
          </Typography>

          <Button
            onClick={() => handleDownload(subtitleUrl, episode)}
            variation="primary"
            size="xs"
            isFullWidth={false}
            isRounded
          >
            {t('Subtitles.download')}
          </Button>
        </li>
      ))}
    </ul>
  )
}

export default EpisodesModal
