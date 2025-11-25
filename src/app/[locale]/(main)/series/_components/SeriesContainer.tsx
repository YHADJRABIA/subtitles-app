'use client'

import { Row, Col } from '@/components/UI/Grid'
import SeriesCard from './SeriesCard'
import styles from '../page.module.scss'
import { Series } from '@/types/series'
import { useFilter } from '@/hooks/series/useFilter'
import SeriesToolbar from './SeriesToolbar'
import Typography from '@/components/UI/Typography'

interface PropTypes {
  series: Series[]
  title: string
}

const SeriesContainer = ({ series, title }: PropTypes) => {
  const { filteredSeries, availableYears } = useFilter(series)

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Typography tag="h1" weight="bold">
          {title}
        </Typography>

        <SeriesToolbar availableYears={availableYears} />
      </div>

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
    </div>
  )
}

export default SeriesContainer
