import Typography from '@/components/UI/Typography'
import styles from './page.module.scss'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import { MetaDataProps } from '../../layout'
import { executeQuery } from '@/lib/datocms/executeQuery'
import { allSeriesQuery } from '@/gql/queries/allSeriesPage'
import { Row, Col } from '@/components/UI/Grid'
import SeriesCard from './_components/SeriesCard'
import { draftMode } from 'next/headers'

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

  const { allSeries } = await executeQuery(allSeriesQuery, {
    includeDrafts: isDraftModeEnabled,
  })

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Typography className={styles.title} tag="h1" weight="bold">
          {t('title')}
        </Typography>
        <Row className={styles.series}>
          {allSeries.map(({ slug, ...series }) => (
            <Col key={slug} width={[12, 6, 4]}>
              <SeriesCard
                {...series}
                slug={slug}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default SeriesPage
