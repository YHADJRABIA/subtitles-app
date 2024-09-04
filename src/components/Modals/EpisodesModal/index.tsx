import React from 'react'
import Typography from '@/components/UI/Typography'

import styles from './EpisodesModal.module.scss'
import { downloadFile } from '@/utils/download'
import { useTranslations } from 'next-intl'
import { SeriesEpisode } from '@/types/series'
import { Button } from '@/components/UI/Button'

interface PropTypes {
  episodes: SeriesEpisode[]
}

const EpisodesModal = ({ episodes }: PropTypes) => {
  const t = useTranslations('Series')

  return (
    <ul className={styles.root}>
      {episodes.map(({ episodeNumber, subtitle }) => {
        const { url, filename } = subtitle
        return (
          <li key={episodeNumber} className={styles.item}>
            <Typography size="xs" weight="semiBold" className={styles.label}>
              {t('Subtitles.episode', { count: episodeNumber })}
            </Typography>

            <Button
              onClick={() => downloadFile(url, filename)}
              variation="primary"
              size="xs"
              isFullWidth={false}
              isRounded
            >
              {t('Subtitles.download')}
            </Button>
          </li>
        )
      })}
    </ul>
  )
}

export default EpisodesModal
