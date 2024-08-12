import React from 'react'
import cn from 'classnames'
import styles from './Video.module.scss'
import { Locale } from '@/types/locale'
import { getYouTubeEmbedUrl, isYouTubeUrl } from '@/utils/video'

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
  if (!videoSrc.length) return

  const isYouTubeVideo = isYouTubeUrl(videoSrc)

  const youtubeUrl = getYouTubeEmbedUrl(videoSrc)

  return isYouTubeVideo ? (
    <iframe
      width={width}
      height={height}
      src={youtubeUrl}
      className={cn(styles.root, className)}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      aria-label="YouTube video" // Todo: make dynamic
    />
  ) : (
    <video
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
      playsInline // For iOS browsers compatibility
    >
      <source src={videoSrc} type="video/mp4" />
      {captionsSrc?.length && (
        <track
          src={captionsSrc}
          kind="subtitles" // Todo: make dynamic?
          srcLang={srcLang}
          label={captionsLabel}
          default
        />
      )}
      Video tag not supported by your browser. {/*  // Todo: make dynamic */}
    </video>
  )
}

export default Video
