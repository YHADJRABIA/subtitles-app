import { graphql } from '@/lib/datocms/graphql'
import { ResponsiveImageFragment } from '@/components/DatoCMS/ResponsiveImage'

export const allSeriesQuery = graphql(
  `
    query AllSeriesQuery {
      allSeries {
        slug
        updatedAt: _updatedAt
        name
        countryOfOrigin
        language
        genre
        releaseYear
        numberOfSeasons
        coverImage {
          responsiveImage {
            ...ResponsiveImageFragment
          }
        }
      }
    }
  `,
  [ResponsiveImageFragment]
)
