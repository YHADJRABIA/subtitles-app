import Typography from '@/components/UI/Typography'
import styles from './page.module.scss'
import { getTranslations } from 'next-intl/server'
import SeriesCast from './_components/SeriesCast'
import SeriesDescription from './_components/SeriesDescription'
import SeriesHighlights from './_components/SeriesHighlights'
import Separator from '@/components/Separator'

import SeriesWhereTo from './_components/SeriesWhereTo'
import { Col, Row } from '@/components/UI/Grid'
import StickyContainer from '@/components/StickyContainer'
import SeriesSubtitles from './_components/SeriesSubtitles'
import { MetaDataProps } from '@/app/[locale]/layout'
import {
  SeriesCountry,
  SeriesGenre,
  SeriesLanguage,
  SeriesNumberOfSeasons,
} from '@/types/series'
import { generateMetadataFn } from '@/lib/datocms/generateMetaDataFn'
import { seriesBySlugQuery } from '@/gql/queries/seriesSlugPage'
import { draftMode } from 'next/headers'
import { executeQuery } from '@/lib/datocms/executeQuery'
import { notFound } from 'next/navigation'
import ResponsiveImage from '@/components/DatoCMS/ResponsiveImage'
import SeriesTrailer from './_components/SeriesTrailer'
import DateDisplay from '@/components/DateDisplay'

export const generateMetadata = generateMetadataFn({
  query: seriesBySlugQuery,
  buildQueryVariables: ({ params: { locale, slug } }: MetaDataProps) => ({
    locale,
    slug,
  }),
  pickSeoMetaTags: data => data.series?._seoMetaTags,
})

export default async function SeriesPage({
  params: { locale, slug },
}: MetaDataProps) {
  const t = await getTranslations({ locale, namespace: 'Series' })
  const { isEnabled: isDraftModeEnabled } = draftMode() // TODO: work on draftmode

  const { series } = await executeQuery(seriesBySlugQuery, {
    variables: { locale, slug },
    includeDrafts: isDraftModeEnabled,
  })

  if (!series) {
    notFound()
  }

  const {
    name,
    translatedName,
    coverImage,
    description,
    countryOfOrigin: country,
    language,
    genre,
    numberOfSeasons,
    releaseYear,
    actors: actorNames,
    directors: directorNames,
    whereToWatch,
    trailer,
    trailerThumbnail,
    subtitles,
    updatedAt,
  } = series

  // TODO: relocale/refactor
  const extractNames = (people: { name: string }[]) =>
    people.map(person => person.name)

  const [actors, directors] = [
    extractNames(actorNames),
    extractNames(directorNames),
  ]

  const coverImageData = coverImage.responsiveImage
  const formattedName = `${name} (${translatedName})`
  const thumbnail = trailerThumbnail?.responsiveImage?.srcSet

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Typography tag="h1" weight="bold" size="xxxl" className={styles.title}>
          {formattedName}
        </Typography>
        <div className={styles.lastUpdate}>
          <Typography size="xs">{t('last_update')}</Typography>
          <DateDisplay showTime date={updatedAt} />
        </div>

        <div className={styles.container}>
          <div className={styles.leftContainer}>
            {coverImageData && (
              <ResponsiveImage
                hasRoundedBorder
                priority
                pictureClassName={styles.image}
                data={coverImageData}
              />
            )}
            <SeriesHighlights
              country={country as SeriesCountry}
              language={language as SeriesLanguage}
              genre={genre as SeriesGenre}
              numberOfSeasons={numberOfSeasons as SeriesNumberOfSeasons}
              releaseYear={releaseYear}
            />
            <Separator color="var(--primary-gray-border)" />
            <SeriesDescription
              title={t('description')}
              body={description}
              className={styles.description}
            />
            <SeriesTrailer videoData={trailer} thumbnail={thumbnail} />
          </div>

          <StickyContainer className={styles.rightContainer}>
            <Row dir="col">
              <Col Tag="section" width={12}>
                <SeriesCast actors={actors} directors={directors} />
              </Col>

              <section className={styles.rightSubContainer}>
                <Col width={12}>
                  <SeriesSubtitles
                    seriesName={name}
                    subtitles={subtitles}
                    shownAmountOfSeasons={numberOfSeasons}
                  />
                </Col>
                <Col width={[12, 12, 6]}>
                  <SeriesWhereTo type="watch" list={whereToWatch} />
                </Col>
              </section>
            </Row>
          </StickyContainer>
        </div>
      </div>
    </div>
  )
}
