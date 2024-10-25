import Typography from '@/components/UI/Typography'
import styles from './page.module.scss'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import InfoImage from '@/components/InfoImage'
import { redirect } from '@/i18n/routing'
import { MetaDataProps } from '../../layout'

export const generateMetadata = async ({
  params: { locale },
}: MetaDataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata.Series' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

const SeriesPage = ({ params: { locale } }: MetaDataProps) => {
  redirect({ href: '/series/patrul', locale }) // TODO: Remove when this page is finished

  const t = useTranslations('Series')
  /* TODO: Add breadcrumbs */

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Typography tag="h1" weight="bold" className={styles.title}>
          {t('title')}
        </Typography>
        <div className={styles.container}>
          <section className={styles.featured}>
            <Typography
              tag="h2"
              weight="semiBold"
              size="xl"
              className={styles.featuredTitle}
            >
              {t('featured')}
            </Typography>

            <InfoImage
              src="/assets/patrul-cover.jpg"
              alt="Patrul"
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
