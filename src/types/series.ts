export type SeriesCountry = 'ru' | 'kz'
export type SeriesLanguage = 'ru' | 'kz'
export type SeriesGenre = 'comedy'
export type SeriesNumberOfSeasons = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export type SeriesEpisode = { episode: number; subtitleUrl: string }

export type SeriesSeason = { season: number; episodes: SeriesEpisode[] }

export type SeriesSubtitles = SeriesSeason[]
