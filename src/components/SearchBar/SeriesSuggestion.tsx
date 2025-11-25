import { Series } from '@/types/series'
import styles from './SeriesSuggestion.module.scss'
import Image from 'next/image'
import { getFlagFromCountryCode } from '@/utils/flag'
import { useTranslations } from 'next-intl'
import { memo } from 'react'
import Typography from '../UI/Typography'
import { Link } from '@/i18n/routing'
import ResponsiveImage from '../DatoCMS/ResponsiveImage'

interface PropTypes {
  series: Series
  onSelect: () => void
}

const SeriesSuggestion = ({ series, onSelect }: PropTypes) => {
  const t = useTranslations('Series')

  const { name, translatedName, genre, releaseYear, countryOfOrigin, slug } =
    series

  const fullName = translatedName ? `${name} (${translatedName})` : name

  const flagSrc = getFlagFromCountryCode(countryOfOrigin)
  const country = t(`Country.${countryOfOrigin}`)
  return (
    <Link
      className={styles.root}
      href={`/series/${slug}`}
      onClick={onSelect}
      onMouseDown={e => e.preventDefault()}
    >
      <div className={styles.image}>
        <ResponsiveImage
          data={series.posterImage.responsiveImage}
          objectFit="cover"
        />
      </div>
      <div className={styles.content}>
        <Typography className={styles.title} tag="h4">
          {fullName}
        </Typography>

        <div className={styles.details}>
          {flagSrc && (
            <Image
              alt={country}
              height={16}
              objectFit="cover"
              src={flagSrc}
              title={country}
              width={16}
            />
          )}
          <Typography size="xxs" tag="h5" weight="semiLight">
            {t('genre_and_year', {
              genre: t(`Genre.${genre}`),
              releaseYear,
            })}
          </Typography>
        </div>
      </div>
    </Link>
  )
}

export default memo(SeriesSuggestion)
