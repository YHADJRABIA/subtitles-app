import { graphql } from '@/lib/datocms/graphql'

export const EpisodeFragment = graphql(`
  fragment EpisodeFragment on EpisodeRecord @_unmask {
    episodeNumber
    subtitle {
      filename
      url
    }
  }
`)
