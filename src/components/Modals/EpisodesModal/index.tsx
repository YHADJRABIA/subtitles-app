import React from 'react'
import Typography from '@/components/UI/Typography'

import styles from './EpisodesModal.module.scss'
import { downloadFile } from '@/utils/download'
import { useTranslations } from 'next-intl'
import { SeriesEpisode } from '@/types/series'

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

          <Typography
            onClick={() => handleDownload(subtitleUrl, episode)}
            size="xs"
            className={styles.cta}
          >
            {t('Subtitles.download')}
          </Typography>
        </li>
      ))}
    </ul>
  )
}

export default EpisodesModal
