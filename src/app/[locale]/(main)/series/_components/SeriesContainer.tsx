'use client'

import { Row, Col } from '@/components/UI/Grid'
import SeriesCard from './SeriesCard'
import styles from '../page.module.scss'
import { Series } from '@/types/series'
import { useFilter } from '@/hooks/series/useFilter'
import SeriesToolbar from './SeriesToolbar'
import Typography from '@/components/UI/Typography'
import { useSeriesFilters } from '@/hooks/series/useSeriesFilters'
import NoResults from './NoResults'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { CSSProperties } from 'react'

interface PropTypes {
  series: Series[]
  title: string
}

const SeriesContainer = ({ series, title }: PropTypes) => {
  const { filteredSeries, availableYears } = useFilter(series)
  const { clearFilters } = useSeriesFilters()
  const scrollDirection = useScrollDirection()
  const isHeaderHidden = scrollDirection === 'down'

  const hasResults = !!filteredSeries.length

  return (
    <div className={styles.root}>
      <div
        className={styles.stickyHeader}
        style={
          {
            '--sticky-top-offset': isHeaderHidden
              ? '0'
              : 'var(--header-height)',
          } as CSSProperties
        }
      >
        <Typography tag="h1" weight="bold">
          {title}
        </Typography>
        <SeriesToolbar availableYears={availableYears} />
      </div>

      {!hasResults ? (
        <NoResults onClear={clearFilters} />
      ) : (
        <Row className={styles.series}>
          {filteredSeries.map(({ slug, posterImage, ...seriesItem }) => (
            <Col key={slug} width={[12, 6, 4]}>
              <SeriesCard
                {...seriesItem}
                href={`/series/${slug}`}
                image={posterImage.responsiveImage}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default SeriesContainer
