import Typography from '@/components/UI/Typography'
import styles from './page.module.scss'
import { useTranslations } from 'next-intl'
import { getNextLocale } from '@/utils/cookies'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import SeriesInfo from './_components/SeriesInfo'
import FilledImage from '@/components/UI/FilledImage'
import SeriesDescription from './_components/SeriesDescription'
import SeriesOrigin from './_components/SeriesOrigin'
import Accordion from '@/components/Accordion'
import { LinkButton } from '@/components/UI/Button'

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = getNextLocale()
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: `${t('prefix')} ${t('Subtitles.title')}`,
    description: t('Subtitles.description'),
  }
}

export default function SeriesPage({}) {
  const t = useTranslations('Series')
  /* TODO: Add breadcrumbs */

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Typography
          tag="h1"
          weight="bold"
          align="left"
          size="xxxl"
          className={styles.title}
        >
          Патруль
        </Typography>
        <div className={styles.container}>
          <div className={styles.leftContainer}>
            <FilledImage
              src="/assets/patrul-image.jpg"
              alt="Patrul"
              className={styles.image}
            />
            <SeriesOrigin
              country="kz"
              language="ru"
              genre="comedy"
              releaseYear={2015}
              className={styles.origin}
            />
            <SeriesDescription
              title={t('description')}
              body="Who are the police? Some claim they are a bunch of layabouts, others claim that the police themselves break the law.
              Actually, their work is important, they protect peaceful citizens from criminals.
              Serik and Berik patrol an entire neighborhood, and they enjoy doing so!
              When one loves their job… one can take a longer lunch break!"
              className={styles.description}
            />
          </div>

          <div className={styles.rightContainer}>
            <SeriesInfo
              numberofSeaons={6}
              actors={[
                'Rustem Omarov',
                'Mejrzhan Turebaev',
                'Mejirkhan Shernjazov',
                'Adilzhan Shombolov',
                'Edil Anarbaj',
                'Medet Amanbaev',
              ]}
              directors={['Anuar Matzhanov', 'Olzhas Ibraev']}
              className={styles.info}
            />
            <Typography
              tag="h3"
              weight="semiBold"
              align="left"
              size="s"
              className={styles.title}
            >
              {t('subtitles')}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}
