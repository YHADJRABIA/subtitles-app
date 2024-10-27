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
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      aria-label="YouTube video" // Todo: make dynamic
      className={cn(styles.root, className)}
      height={height}
      src={youtubeUrl}
      width={width}
    />
  ) : (
    <video
      playsInline // For iOS browsers compatibility
      aria-label="Video" // Todo: make dynamic
      autoPlay={isAutoPlay}
      className={cn(styles.root, className)}
      controls={showControls}
      height={height}
      loop={isLooping}
      muted={isMuted}
      poster={thumbnailSrc}
      preload={preload}
      width={width}
    >
      <source src={videoSrc} type="video/mp4" />
      {captionsSrc?.length && (
        <track
          default
          kind="subtitles"
          label={captionsLabel}
          src={captionsSrc}
          srcLang={capitaliseFirstLetter(srcLang)}
        />
      )}
      {t('not_supported')}
    </video>
  )
}

export default Video
