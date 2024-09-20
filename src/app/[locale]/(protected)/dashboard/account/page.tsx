import React from 'react'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import styles from './page.module.scss'
import Typography from '@/components/UI/Typography'
import { getUserSession } from '@/utils/session'
import DeleteAccountButton from '../_components/DeleteAccountButton'
import { Metadata } from 'next/types'
import { MetaDataProps } from '@/app/[locale]/layout'
import DateDisplay from '@/components/DateDisplay'

export const generateMetadata = async ({
  params: { locale },
}: MetaDataProps): Promise<Metadata> => {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.Protected.Account',
  })

  return {
    title: t('title'),
    description: t('description'),
  }
}

const DashboardAccountPage = async ({ params: { locale } }: MetaDataProps) => {
  unstable_setRequestLocale(locale)
  const {
    creationDate,
    lastUpdateDate,
    lastLoginDate,
    id: userId,
  } = await getUserSession()

  const t = await getTranslations({ locale, namespace: 'Dashboard.Account' })

  return (
    <>
      <Typography isFullWidth tag="h1" size="xxl" weight="semiBold">
        {t('title')}
      </Typography>
      <div className={styles.container}>
        <div className={styles.fieldsContainer}>
          {/* TODO: refactor fieldsContainer common to all dashboard pages */}
          {creationDate && (
            <div className={styles.field}>
              <Typography weight="semiBold" size="xs">
                {t('registered_since')}
              </Typography>
              <DateDisplay date={creationDate} />
            </div>
          )}
          {lastUpdateDate && (
            <div className={styles.field}>
              <Typography weight="semiBold" size="xs">
                {t('last_update')}
              </Typography>
              <DateDisplay date={lastUpdateDate} />
            </div>
          )}
          {lastLoginDate && (
            <div className={styles.field}>
              <Typography weight="semiBold" size="xs">
                {t('last_visit')}
              </Typography>
              <DateDisplay date={lastLoginDate} showTime />
            </div>
          )}
        </div>
        <DeleteAccountButton userId={userId} className={styles.cta} />
      </div>
    </>
  )
}

export default DashboardAccountPage
