import { ResponsiveImageFragment } from '@/components/DatoCMS/ResponsiveImage'

import { graphql } from '@/lib/datocms/graphql'
import { TagFragment } from '../fragments/commonFragments'
import { PersonFragment } from '../fragments/person-fragment'
import { TextWithLinkFragment } from '../fragments/text-with-link-fragment'
import { EpisodeFragment } from '../fragments/episode-fragment'
import { VideoPlayerFragment } from '@/components/DatoCMS/VideoPlayer'

export const seriesBySlugQuery = graphql(
  `
    query SeriesBySlugQuery($locale: SiteLocale, $slug: String!) {
      series(
        locale: $locale
        filter: { slug: { eq: $slug } }
        fallbackLocales: en
      ) {
        _seoMetaTags {
          ...TagFragment
        }

        updatedAt: _updatedAt

        coverImage {
          responsiveImage(
            sizes: "(max-width: 600px) 100vw, 600px"
            imgixParams: { auto: [format, compress] }
          ) {
            ...ResponsiveImageFragment
          }
        }

        name
        translatedName
        description
        countryOfOrigin
        language
        genre
        releaseYear
        numberOfSeasons

        directors {
          ...PersonFragment
        }
        actors {
          ...PersonFragment
        }

        trailer {
          ...VideoPlayerFragment
        }

        trailerThumbnail {
          responsiveImage {
            srcSet
          }
        }

        subtitles {
          seasonNumber
          episodes {
            ...EpisodeFragment
          }
        }

        whereToWatch {
          ...TextWithLinkFragment
        }
      }
    }
  `,
  [
    TagFragment,
    ResponsiveImageFragment,
    PersonFragment,
    TextWithLinkFragment,
    EpisodeFragment,
    VideoPlayerFragment,
  ]
)
