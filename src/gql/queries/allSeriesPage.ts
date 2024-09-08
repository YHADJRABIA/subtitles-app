import { graphql } from '@/lib/datocms/graphql'

export const allSeriesQuery = graphql(`
  query AllSeriesQuery {
    allSeries {
      slug
      updatedAt: _updatedAt
    }
  }
`)
