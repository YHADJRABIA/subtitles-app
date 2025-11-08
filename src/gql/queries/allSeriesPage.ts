import { graphql } from '@/lib/datocms/graphql'
import { ResponsiveImageFragment } from '@/components/DatoCMS/ResponsiveImage'

export const allSeriesQuery = graphql(
  `
    query AllSeriesQuery($locale: SiteLocale) {
      allSeries(locale: $locale, fallbackLocales: en) {
        slug
        updatedAt: _updatedAt
        name
        translatedName
        description
        countryOfOrigin
        language
        genre
        releaseYear
        numberOfSeasons
        posterImage {
          responsiveImage {
            ...ResponsiveImageFragment
          }
        }
      }
    }
  `,
  [ResponsiveImageFragment]
)
