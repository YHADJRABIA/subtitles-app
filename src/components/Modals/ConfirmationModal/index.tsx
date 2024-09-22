import React, { useState } from 'react'
import Typography from '@/components/UI/Typography'

import styles from './ConfirmationModal.module.scss'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/UI/Button'
import {
  PiInfoFill as InfoIcon,
  PiWarningFill as WarningIcon,
} from 'react-icons/pi'
import useIsOnMobile from '@/hooks/useIsOnMobile'
import { getErrorMessage } from '@/utils/errors'

interface PropTypes {
  onConfirm: () => void | Promise<void>
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
  const [isLoading, setisLoading] = useState(false)
  const t = useTranslations('ConfirmationModal')
  const isInfo = type === 'info'
  const Icon = isInfo ? InfoIcon : WarningIcon
  const color = isInfo ? undefined : 'var(--primary-red-color)'

  const handleConfirm = async () => {
    setisLoading(true)
    try {
      await onConfirm()
    } catch (err) {
      console.error('Error in confirmation:', getErrorMessage(err))
    } finally {
      setisLoading(false)
    }
  }

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
            isLoading={isLoading}
            disabled={isLoading}
            backgroundColor={color}
            size="xs"
            isFullWidth={isOnMobile}
            onClick={handleConfirm}
          >
            {t('yes')}
          </Button>

          <Button
            variation="secondary"
            size="xs"
            isFullWidth={isOnMobile}
            onClick={onCancel}
          >
            {t('no')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
