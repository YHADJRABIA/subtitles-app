import { use } from 'react'
import Typography from '@/components/UI/Typography'
import styles from './page.module.scss'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import InfoImage from '@/components/InfoImage'
import { redirect } from '@/i18n/routing'
import { MetaDataProps } from '../../layout'

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

const SeriesPage = ({ params }: MetaDataProps) => {
  const { locale } = use(params)

  redirect({ href: '/series/patrul', locale }) // TODO: Remove when this page is finished

  const t = useTranslations('Series')

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Typography className={styles.title} tag="h1" weight="bold">
          {t('title')}
        </Typography>
        <div className={styles.container}>
          <section className={styles.featured}>
            <Typography
              className={styles.featuredTitle}
              size="xl"
              tag="h2"
              weight="semiBold"
            >
              {t('featured')}
            </Typography>

            <InfoImage
              alt="Patrul"
              src="/assets/patrul-cover.jpg"
              title="Патруль"
            />
          </section>

          {/*  <section className={styles.series}>
          <Typography
            tag="h2"
            weight="semiBold"
            size="xl"
            className={styles.seriesTitle}
          >
            {t('all_series')}
          </Typography>

          <div className={styles.serie}>
            <Typography
              tag="h3"
              size="m"
              link={{ href: '/series/patrul' }}
            >
              Патруль
            </Typography>
          </div>
        </section> */}
        </div>
      </div>
    </div>
  )
}

/*  <Row>
          <Col width={12}>
            <Video
              videoSrc="/assets/patrul-trailer.mp4"
              className={styles.trailer}
              captionsSrc="/assets/patrul-trailer.vtt"
              captionsLabel="En"
            />
          </Col>
        </Row> */

export default SeriesPage
