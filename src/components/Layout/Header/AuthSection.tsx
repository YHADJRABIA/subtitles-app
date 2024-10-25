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
        <Link href="/dashboard" className={cn(styles.profileIcon, className)}>
          {/* TODO: Update with user avatar + name */}
          {hasAvatar ? <RxAvatar size={26} /> : <RxAvatar size={26} />}
        </Link>
      ) : (
        <div className={cn(styles.authCta, className)}>
          <Typography
            size="s"
            link={{ href: '/login' }}
            className={styles.loginCta}
          >
            {t('login')}
          </Typography>
          <Typography
            size="s"
            link={{ href: '/register' }}
            className={styles.registerCta}
          >
            {t('register')}
          </Typography>
        </div>
      )}
    </>
  )
}

export default AuthSection
