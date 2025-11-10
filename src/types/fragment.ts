import { ResponsiveImageFragment } from '@/components/DatoCMS/ResponsiveImage'
import { VideoPlayerFragment } from '@/components/DatoCMS/VideoPlayer'
import { FragmentOf } from 'gql.tada'

export type ResponsiveImageType = FragmentOf<typeof ResponsiveImageFragment>
export type VideoPlayerType = FragmentOf<typeof VideoPlayerFragment>
