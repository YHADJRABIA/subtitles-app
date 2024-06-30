import React from 'react'
import styles from './AuthSection.module.scss'
import { Link } from '@/lib/i18n/navigation'
import { useTranslations } from 'next-intl'
import Typography from '@/components/UI/Typography'
import cn from 'classnames'

interface PropTypes {
  showAccount: boolean
  className?: string
}

const AuthSection = ({ showAccount, className }: PropTypes) => {
  const t = useTranslations('Navigation')
  return (
    <>
      {showAccount ? (
        <div className={cn(styles.profileIcon, className)}>
          <Link href="/dashboard">{t('dashboard')}</Link>
        </div>
      ) : (
        <div className={cn(styles.authCta, className)}>
          <Typography size="s" href="/login" className={styles.loginCta}>
            {t('login')}
          </Typography>
          <Typography size="s" href="/register" className={styles.registerCta}>
            {t('register')}
          </Typography>
        </div>
      )}
    </>
  )
}

export default AuthSection
