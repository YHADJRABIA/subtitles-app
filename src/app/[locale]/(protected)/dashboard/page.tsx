import React from 'react'
import { getTranslations } from 'next-intl/server'
import LogoutButton from '@/components/Auth/LogoutButton'
import styles from './page.module.scss'
import { getUserSession } from '@/utils/session'
import Typography from '@/components/UI/Typography'
import EditableAvatar from './_components/EditableAvatar'
import EditableField from './_components/EditableField'
import { getNextLocale } from '@/utils/cookies'
import { Metadata } from 'next/types'
import UnderDevelopment from '@/components/UnderDevelopment'

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = getNextLocale()
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.Protected.Dashboard',
  })

  return {
    title: t('title'),
    description: t('description'),
  }
}

const DashboardPage = async () => {
  const { email, name, image } = await getUserSession()

  const locale = getNextLocale()

  const t = await getTranslations({ locale, namespace: 'Dashboard' })

  return (
    <div className={styles.root}>
      <Typography
        isFullWidth
        tag="h1"
        size="xxl"
        weight="semiBold"
        className={styles.title}
      >
        {t('title')}
      </Typography>

      <UnderDevelopment />

      <EditableAvatar
        className={styles.avatar}
        src={image}
        /*         onValidate={() => {}} */
      />
      <div className={styles.userInfo}>
        <EditableField
          label={t('name')}
          value={name ?? ''}
          /*           onValidate={() => {}} */
        />
        <EditableField
          label={t('email')}
          value={email ?? ''}
          /*           onValidate={() => {}} */
        />
      </div>

      <LogoutButton label={t('log_out')} className={styles.logoutCta} />
    </div>
  )
}

export default DashboardPage
