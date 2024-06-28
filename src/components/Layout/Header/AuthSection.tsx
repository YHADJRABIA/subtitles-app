import React from 'react'
import styles from './AuthSection.module.scss'
import Link from '@/components/Link'
import { useTranslations } from 'next-intl'

interface PropTypes {
  showAccount: boolean
}

const AuthSection = ({ showAccount }: PropTypes) => {
  const t = useTranslations('Navigation')
  return (
    <div className={styles.root}>
      {showAccount ? (
        <div className={styles.profileIcon}>
          <Link href="/dashboard">{t('dashboard')}</Link>
        </div>
      ) : (
        <div className={styles.authCTA}>
          <Link href="/login" className={styles.secondaryCTA}>
            {t('login')}
          </Link>
          <Link href="/register" className={styles.mainCTA}>
            {t('register')}
          </Link>
        </div>
      )}
    </div>
  )
}

export default AuthSection
