'use client'
import React from 'react'
import styles from './AccountInfo.module.scss'
import Typography from '@/components/UI/Typography'
import DateDisplay from '@/components/DateDisplay'
import { useTranslations } from 'next-intl'
import { useSession } from 'next-auth/react'
import cn from 'classnames'

interface PropTypes {
  creationDate: string
  lastUpdateDate?: string
  lastLoginDate?: string
  className?: string
}

const AccountInfo = ({
  creationDate,
  lastUpdateDate: serverLastUpdateDate,
  lastLoginDate: serverLastLoginDate,
  className,
}: PropTypes) => {
  const t = useTranslations('Dashboard.Account')

  const { data: clientSession } = useSession()
  // Prioritise client-side session after update to have real-time data, fallback to server-side session
  const lastUpdateDate =
    clientSession?.user?.lastUpdateDate || serverLastUpdateDate
  const lastLoginDate =
    clientSession?.user?.lastLoginDate || serverLastLoginDate

  return (
    <div className={cn(styles.root, className)}>
      {creationDate && (
        <div className={styles.field}>
          <Typography size="xs" weight="semiBold">
            {t('registered_since')}
          </Typography>
          <DateDisplay date={creationDate} />
        </div>
      )}
      {lastUpdateDate && (
        <div className={styles.field}>
          <Typography size="xs" weight="semiBold">
            {t('last_update')}
          </Typography>
          <DateDisplay date={lastUpdateDate} />
        </div>
      )}
      {lastLoginDate && (
        <div className={styles.field}>
          <Typography size="xs" weight="semiBold">
            {t('last_visit')}
          </Typography>
          <DateDisplay showTime date={lastLoginDate} />
        </div>
      )}
    </div>
  )
}

export default AccountInfo
