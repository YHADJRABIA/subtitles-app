'use client'

import Typography from '@/components/UI/Typography'
import { Button } from '@/components/UI/Button'
import { useTranslations } from 'next-intl'
import { PiArrowCounterClockwiseBold as ResetIcon } from 'react-icons/pi'
import styles from './NoResults.module.scss'
import cn from 'classnames'

interface PropTypes {
  onClear: () => void
  className?: string
}

const NoResults = ({ onClear, className }: PropTypes) => {
  const t = useTranslations('Series')

  return (
    <div className={cn(styles.root, className)}>
      <Typography size="xl" tag="h2" weight="semiBold">
        {t('no_results')}
      </Typography>
      <Typography className={styles.content} size="m" weight="semiLight">
        {t('adapt_filter')}
      </Typography>
      <Button
        className={styles.reset}
        isFullWidth={false}
        size="xs"
        variation="primary"
        onClick={onClear}
      >
        <ResetIcon size={18} />
        {t('reset_filters')}
      </Button>
    </div>
  )
}

export default NoResults
