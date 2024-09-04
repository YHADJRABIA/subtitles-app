import { type FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql'
import {
  VideoPlayer as DatoVideoPlayer,
  type VideoPlayerProps,
} from 'react-datocms'

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
}

/**
 * This component is a wrapper for the `<VideoPlayer />` component provided by
 * react-datocms, optimized for use with graphql.tada. We define the necessary
 * GraphQL fragment for this component to function only once, then reuse it
 * wherever needed.
 */
export default function VideoPlayer({ data, ...other }: Props) {
  const unmaskedData = readFragment(VideoPlayerFragment, data)

  return (
    <DatoVideoPlayer
      data={unmaskedData.video}
      accentColor="var(--tertiary-black-color)"
      {...other}
    />
  )
}
