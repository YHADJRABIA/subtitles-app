import React from 'react'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import LogoutButton from '@/components/Auth/LogoutButton'
import styles from './page.module.scss'
import { getUserSession } from '@/utils/session'
import Typography from '@/components/UI/Typography'
import EditableAvatar from './_components/EditableAvatar'
import EditableField from './_components/EditableField'
import { Metadata } from 'next/types'
import UnderDevelopment from '@/components/UnderDevelopment'
import { MetaDataProps } from '../../layout'

export const generateMetadata = async ({
  params: { locale },
}: MetaDataProps): Promise<Metadata> => {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.Protected.Dashboard',
  })

  return {
    title: t('title'),
    description: t('description'),
  }
}

const DashboardPage = async ({ params: { locale } }: MetaDataProps) => {
  unstable_setRequestLocale(locale)
  const { email, name, image } = await getUserSession()

  const t = await getTranslations({ locale, namespace: 'Dashboard' })

  return (
    <>
      <Typography isFullWidth tag="h1" size="xxl" weight="semiBold">
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
    </>
  )
}

export default DashboardPage
