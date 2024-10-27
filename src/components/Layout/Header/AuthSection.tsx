import React from 'react'
import styles from './AuthSection.module.scss'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import Typography from '@/components/UI/Typography'
import { RxAvatar } from 'react-icons/rx'
import cn from 'classnames'

interface PropTypes {
  showAccount: boolean
  className?: string
  userAvatar?: string
}

const AuthSection = ({ showAccount, className, userAvatar }: PropTypes) => {
  const t = useTranslations('Navigation')
  const hasAvatar = !!userAvatar // Not just avatar, but also name or "user"
  return (
    <>
      {showAccount ? (
        <Link className={cn(styles.profileIcon, className)} href="/dashboard">
          {/* TODO: Update with user avatar + name */}
          {hasAvatar ? <RxAvatar size={26} /> : <RxAvatar size={26} />}
        </Link>
      ) : (
        <div className={cn(styles.authCta, className)}>
          <Typography
            className={styles.loginCta}
            link={{ href: '/login' }}
            size="s"
          >
            {t('login')}
          </Typography>
          <Typography
            className={styles.registerCta}
            link={{ href: '/register' }}
            size="s"
          >
            {t('register')}
          </Typography>
        </div>
      )}
    </>
  )
}

export default AuthSection
