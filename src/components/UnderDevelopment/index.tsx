import React from 'react'
import { MdOutlineConstruction as InDevelopmentIcon } from 'react-icons/md'

import styles from './UnderDevelopment.module.scss'
import Typography from '../UI/Typography'
import { useTranslations } from 'next-intl'

const UnderDevelopment = () => {
  const t = useTranslations('UnderDevelopement')
  return (
    <div className={styles.root}>
      <InDevelopmentIcon className={styles.icon} size={22} />
      <Typography size="m" weight="semiBold">
        {t('title')}
      </Typography>
    </div>
  )
}

export default UnderDevelopment
