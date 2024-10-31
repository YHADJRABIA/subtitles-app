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
          <li className={styles.item} key={episodeNumber}>
            <Typography className={styles.label} size="xs" weight="semiBold">
              {t('Subtitles.episode', { count: episodeNumber })}
            </Typography>

            <Button
              isRounded
              isFullWidth={false}
              size="xs"
              variation="primary"
              onClick={() => downloadFile(url, filename)}
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
