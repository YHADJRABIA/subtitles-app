import { ResponsiveImageType } from './fragment'

export type SeriesCountry = 'ru' | 'kz'
export type SeriesLanguage = 'ru' | 'kz'
export type SeriesGenre = 'comedy'
export type SeriesNumberOfSeasons = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export type SeriesEpisode = {
  episodeNumber: number
  subtitle: { url: string; filename: string }
}

export type SeriesSeason = { seasonNumber: number; episodes: SeriesEpisode[] }

export type SeriesSubtitles = SeriesSeason[]

export type Series = {
  slug: string
  posterImage: {
    responsiveImage: ResponsiveImageType
  }
  name: string
  translatedName?: string
  description: string
  releaseYear: number
  numberOfSeasons: SeriesNumberOfSeasons
  genre: SeriesGenre
  countryOfOrigin: SeriesCountry
}
