import React from 'react'
import Typography from '@/components/UI/Typography'

import styles from './ConfirmationModal.module.scss'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/UI/Button'
import {
  PiInfoFill as InfoIcon,
  PiWarningFill as WarningIcon,
} from 'react-icons/pi'
import useIsOnMobile from '@/hooks/useIsOnMobile'

interface PropTypes {
  onConfirm: () => void
  onCancel: () => void
  message: string
  type?: 'info' | 'warning'
}

const ConfirmationModal = ({
  onConfirm,
  onCancel,
  message,
  type = 'info',
}: PropTypes) => {
  const isOnMobile = useIsOnMobile()
  const t = useTranslations('ConfirmationModal')
  const isInfo = type === 'info'
  const Icon = isInfo ? InfoIcon : WarningIcon
  const color = isInfo ? undefined : 'var(--primary-red-color)'
  return (
    <div className={styles.root}>
      <Typography size="s" color={color}>
        {message}
      </Typography>

      <div className={styles.ctaSection}>
        <span className={styles.textContainer}>
          <Icon className={styles.icon} color={color} />
          <Typography
            size="s"
            weight="semiBold"
            className={styles.confirmation}
          >
            {t('are_you_sure')}
          </Typography>
        </span>
        <div className={styles.cta}>
          <Button
            variation="primary"
            backgroundColor={color}
            onClick={onConfirm}
            size="xs"
            isFullWidth={isOnMobile}
          >
            {t('yes')}
          </Button>

          <Button
            variation="secondary"
            onClick={onCancel}
            size="xs"
            isFullWidth={isOnMobile}
          >
            {t('no')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
