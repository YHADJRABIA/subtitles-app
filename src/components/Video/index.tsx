import React from 'react'
import cn from 'classnames'
import styles from './Video.module.scss'
import { Locale } from '@/types/locale'
import { useTranslations } from 'next-intl'
import { getYouTubeEmbedUrl, isYouTubeUrl } from '@/utils/video'
import { capitaliseFirstLetter } from '@/utils/string'

// TODO: Deprecate this, and use Mux Video player instead

interface PropTypes {
  className?: string
  showControls?: boolean
  isMuted?: boolean
  isAutoPlay?: boolean
  isLooping?: boolean
  preload?: 'none' | 'metadata' | 'auto'
  videoSrc: string
  thumbnailSrc?: string
  captionsSrc?: string
  captionsLabel?: string
  srcLang?: Locale
  width?: number | string
  height?: number | string
}

const Video = ({
  className,
  showControls = true,
  isMuted = false,
  isAutoPlay = false,
  isLooping = false,
  preload = 'auto',
  videoSrc,
  captionsSrc,
  thumbnailSrc,
  width = 320,
  height = 240,
  captionsLabel,
  srcLang = 'en',
}: PropTypes) => {
  const t = useTranslations('Video')

  if (!videoSrc.length) return

  const isYouTubeVideo = isYouTubeUrl(videoSrc)

  const youtubeUrl = getYouTubeEmbedUrl(videoSrc)

  return isYouTubeVideo ? (
    <iframe
      allowFullScreen
      width={width}
      height={height}
      src={youtubeUrl}
      className={cn(styles.root, className)}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      aria-label="YouTube video" // Todo: make dynamic
    />
  ) : (
    <video
      playsInline // For iOS browsers compatibility
      width={width}
      height={height}
      controls={showControls}
      autoPlay={isAutoPlay}
      muted={isMuted}
      loop={isLooping}
      preload={preload}
      className={cn(styles.root, className)}
      aria-label="Video" // Todo: make dynamic
      poster={thumbnailSrc}
    >
      <source src={videoSrc} type="video/mp4" />
      {captionsSrc?.length && (
        <track
          default
          src={captionsSrc}
          kind="subtitles"
          srcLang={capitaliseFirstLetter(srcLang)}
          label={captionsLabel}
        />
      )}
      {t('not_supported')}
    </video>
  )
}

export default Video
