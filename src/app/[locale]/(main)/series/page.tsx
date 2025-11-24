import Typography from '@/components/UI/Typography'
import styles from './page.module.scss'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import { MetaDataProps } from '../../layout'
import { executeQuery } from '@/lib/datocms/executeQuery'
import { allSeriesQuery } from '@/gql/queries/allSeriesPage'
import SeriesPageClient from './_components/SeriesPageClient'
import { draftMode } from 'next/headers'
import { ResponsiveImageType } from '@/types/fragment'
import { Series } from '@/types/series'

export const generateMetadata = async ({
  params,
}: MetaDataProps): Promise<Metadata> => {
  const { locale } = await params

  const t = await getTranslations({ locale, namespace: 'Metadata.Series' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

const SeriesPage = async ({ params }: MetaDataProps) => {
  const { locale } = await params

  const t = await getTranslations({ locale, namespace: 'Series' })
  const { isEnabled: isDraftModeEnabled } = await draftMode()

  const { allSeries } = (await executeQuery(allSeriesQuery, {
    variables: { locale },
    includeDrafts: isDraftModeEnabled,
  })) as {
    allSeries: Series[]
  }

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Typography className={styles.title} tag="h1" weight="bold">
          {t('title')}
        </Typography>
        <SeriesPageClient
          series={allSeries.map(series => ({
            ...series,
            posterImage: {
              responsiveImage: series.posterImage
                .responsiveImage as ResponsiveImageType,
            },
          }))}
        />
      </div>
    </div>
  )
}

export default SeriesPage
