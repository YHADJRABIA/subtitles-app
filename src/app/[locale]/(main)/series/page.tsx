import Typography from '@/components/UI/Typography'
import styles from './page.module.scss'
import { useTranslations } from 'next-intl'
import { getNextLocale } from '@/utils/cookies'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import { Col, Row } from '@/components/UI/Grid'
import InfoImage from '@/components/InfoImage'
import Separator from '@/components/Separator'
import { redirect } from 'next/navigation'

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = getNextLocale()
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: `${t('prefix')} ${t('Series.title')}`,
    description: t('Series.description'),
  }
}

export default function SeriesPage() {
  redirect('/series/patrul') // TODO: Remove when this page is finished
  const t = useTranslations('Series')
  /* TODO: Add breadcrumbs */

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Typography
          tag="h1"
          weight="bold"
          align="left"
          className={styles.title}
        >
          {t('title')}
        </Typography>
        <div className={styles.container}>
          <section className={styles.featured}>
            <Typography
              tag="h2"
              weight="semiBold"
              align="left"
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
            align="left"
            size="xl"
            className={styles.seriesTitle}
          >
            {t('all_series')}
          </Typography>

          <div className={styles.serie}>
            <Typography
              tag="h3"
              align="left"
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
