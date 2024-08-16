import React from 'react'
import { MdOutlineConstruction as InDevelopmentIcon } from 'react-icons/md'

import styles from './UnderDevelopment.module.scss'
import Typography from '../UI/Typography'
import { useTranslations } from 'next-intl'

const UnderDevelopment = () => {
  const t = useTranslations('UnderDevelopement')
  return (
    <div className={styles.root}>
      <InDevelopmentIcon size={22} className={styles.icon} />
      <Typography size="m" weight="semiBold">
        {t('title')}
      </Typography>
    </div>
  )
}

export default UnderDevelopment
