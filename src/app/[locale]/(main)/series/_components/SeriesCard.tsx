import styles from './SeriesCard.module.scss'
import cn from 'classnames'
import Typography from '@/components/UI/Typography'
import {
  PiCalendarDotsThin as CalendarIcon,
  PiTelevisionThin as SeasonsIcon,
} from 'react-icons/pi'
import { Link } from '@/i18n/routing'
import type {
  SeriesCountry,
  SeriesGenre,
  SeriesNumberOfSeasons,
} from '@/types/series'
import ResponsiveImage from '@/components/DatoCMS/ResponsiveImage'
import Image from 'next/image'
import { getFlagFromCountryCode } from '@/utils/flag'
import { useTranslations } from 'next-intl'
import { colors } from '@/utils/color'
import { ResponsiveImageType } from '@/types/fragment'

interface PropTypes {
  href: string
  name: string
  translatedName: string
  description: string
  image: ResponsiveImageType
  releaseYear: number
  numberOfSeasons: SeriesNumberOfSeasons
  genre: SeriesGenre
  countryOfOrigin: SeriesCountry
  className?: string
}

const SeriesCard = ({
  href,
  name,
  translatedName,
  description,
  image,
  releaseYear,
  numberOfSeasons,
  genre,
  countryOfOrigin,
  className,
}: PropTypes) => {
  const t = useTranslations('Series')

  const fullName = translatedName ? `${name} (${translatedName})` : name
  const hasDescription = !!description.length
  const flagSrc = getFlagFromCountryCode(countryOfOrigin) ?? null

  return (
    <Link className={cn(styles.root, className)} href={href}>
      <div className={styles.wrapper}>
        <ResponsiveImage
          hasRoundedBorder
          priority
          data={image}
          imgClassName={styles.image}
        />

        <div className={styles.overlay}>
          <Typography
            color={colors.white.primary}
            size="l"
            tag="h3"
            weight="bold"
          >
            {fullName}
          </Typography>

          {hasDescription && (
            <Typography className={styles.description} size="xs">
              {description}
            </Typography>
          )}

          {/* TODO: Update when tags is array */}
          {!!genre.length && (
            <div className={styles.tags}>
              <Typography
                capitalize
                className={styles.tag}
                size="xxs"
                weight="semiLight"
              >
                {t(`Genre.${genre}`)}
              </Typography>
            </div>
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.top}>
          <Typography tag="h3" weight="semiBold">
            {name}
          </Typography>
          {flagSrc && (
            <Image
              alt={t(`Country.${countryOfOrigin}`)}
              height={28}
              src={flagSrc}
              title={t(`Country.${countryOfOrigin}`)}
              width={28}
            />
          )}
        </div>

        <div className={styles.bottom}>
          {numberOfSeasons && (
            <span className={styles.row}>
              <SeasonsIcon size={18} title={t('Seasons.title')} />
              <Typography size="xs" weight="semiLight">
                {t('Seasons.number_of_seasons', { count: numberOfSeasons })}
              </Typography>
            </span>
          )}

          {releaseYear && (
            <span className={styles.row}>
              <CalendarIcon
                color={colors.black.primary}
                size={18}
                title={t('release_year')}
              />
              <Typography size="xs" weight="semiLight">
                {releaseYear}
              </Typography>
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default SeriesCard
