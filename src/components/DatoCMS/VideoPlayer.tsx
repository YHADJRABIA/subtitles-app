import { type FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql'
import {
  VideoPlayer as DatoVideoPlayer,
  type VideoPlayerProps,
} from 'react-datocms'
import styles from './VideoPlayer.module.scss'
import cn from 'classnames'

export const VideoPlayerFragment = graphql(`
  fragment VideoPlayerFragment on VideoAltTitleFileField {
    video {
      alt
      title
      width
      height
      mp4Url
      streamingUrl
      muxAssetId
      muxPlaybackId
      thumbhash
      thumbnailUrl
      duration
      blurUpThumb
      framerate
      blurhash
    }
  }
`)

type Props = Omit<VideoPlayerProps, 'data'> & {
  data: FragmentOf<typeof VideoPlayerFragment>
  className?: string
}

/**
 * This component is a wrapper for the `<VideoPlayer />` component provided by
 * react-datocms, optimized for use with graphql.tada. We define the necessary
 * GraphQL fragment for this component to function only once, then reuse it
 * wherever needed.
 */
export default function VideoPlayer({ data, className, ...other }: Props) {
  const unmaskedData = readFragment(VideoPlayerFragment, data)

  return (
    <div className={cn(styles.root, className)}>
      <DatoVideoPlayer
        accentColor="var(--tertiary-black-color)"
        data={unmaskedData.video}
        {...other}
      />
    </div>
  )
}
