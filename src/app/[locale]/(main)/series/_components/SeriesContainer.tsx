'use client'

import { Row, Col } from '@/components/UI/Grid'
import SeriesCard from './SeriesCard'
import styles from '../page.module.scss'
import { Series } from '@/types/series'
import SeriesFilter from './SeriesFilter'
import { useFilter } from '@/hooks/series/useFilter'

interface PropTypes {
  series: Series[]
}

const SeriesContainer = ({ series }: PropTypes) => {
  const { filteredSeries, availableYears } = useFilter(series)

  return (
    <>
      <SeriesFilter availableYears={availableYears} />
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
    </>
  )
}

export default SeriesContainer
