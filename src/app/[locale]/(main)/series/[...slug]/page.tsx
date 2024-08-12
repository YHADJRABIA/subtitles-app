import Typography from '@/components/UI/Typography'
import styles from './page.module.scss'
import { useTranslations } from 'next-intl'
import { getNextLocale } from '@/utils/cookies'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import SeriesInfo from './_components/SeriesInfo'
import FilledImage from '@/components/UI/FilledImage'
import SeriesDescription from './_components/SeriesDescription'
import SeriesOrigin, {
  SeriesCountry,
  SeriesGenre,
  SeriesLanguage,
  SeriesNumberOfSeasons,
} from './_components/SeriesOrigin'
import cn from 'classnames'
import Accordion from '@/components/Accordion'
import { LinkButton } from '@/components/UI/Button'
import Separator from '@/components/Separator'
import Video from '@/components/Video'
import SeriesTrailer from './_components/SeriesTrailer'

// TODO: fetch from CMS
const DATA = {
  image: '/assets/patrul-image.jpg',
  imageAlt: 'Patrul',
  name: 'Патруль',
  country: 'kz',
  language: 'ru',
  genre: 'comedy',
  releaseYear: 2015,
  numberOfSeasons: 6,
  description:
    'Who are the police? Some claim they are a bunch of layabouts, others claim that the police themselves break the law. Actually, their work is important, they protect peaceful citizens from criminals. Serik and Berik patrol an entire neighborhood, and they enjoy doing so! When one loves their job… one can take a longer lunch break!',
  actors: [
    'Rustem Omarov',
    'Mejrzhan Turebaev',
    'Mejirkhan Shernjazov',
    'Adilzhan Shombolov',
    'Edil Anarbaj',
    'Medet Amanbaev',
  ],
  directors: ['Anuar Matzhanov', 'Olzhas Ibraev'],
  trailer: '/assets/patrul-trailer.mp4',
  trailerThumbnail: '/assets/patrul-thumbnail.jpg',
  captions: '/assets/patrul-trailer.vtt',
}

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = getNextLocale()
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: `${t('prefix')} ${DATA.name}`,
    description: DATA.description,
    openGraph: {
      type: 'video.tv_show',
    },
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
          className={cn(styles.title, styles.withPadding)}
        >
          {DATA.name}
        </Typography>
        <div className={styles.container}>
          <div className={cn(styles.leftContainer, styles.withPadding)}>
            <FilledImage
              src={DATA.image}
              alt={DATA.imageAlt}
              className={styles.image}
            />
            <SeriesOrigin
              country={DATA.country as SeriesCountry}
              language={DATA.language as SeriesLanguage}
              genre={DATA.genre as SeriesGenre}
              numberOfSeasons={DATA.numberOfSeasons as SeriesNumberOfSeasons}
              releaseYear={DATA.releaseYear}
            />
            <Separator color="var(--primary-gray-border)" />
            <SeriesDescription
              title={t('description')}
              body={DATA.description}
              className={styles.description}
            />
            <SeriesTrailer
              src={DATA.trailer}
              captionsSrc={DATA.captions}
              thumbnail={DATA.trailerThumbnail}
              className={styles.trailer}
            />
          </div>

          <div className={styles.rightContainer}>
            <SeriesInfo
              actors={DATA.actors}
              directors={DATA.directors}
              className={styles.info}
            />

            <Typography
              tag="h3"
              weight="semiBold"
              align="left"
              size="s"
              className={styles.title}
            >
              {t('where_to_watch')}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}
