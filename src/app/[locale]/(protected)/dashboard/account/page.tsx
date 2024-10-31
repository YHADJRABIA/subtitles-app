import React from 'react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
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
  setRequestLocale(locale)
  const {
    creationDate,
    lastUpdateDate,
    lastLoginDate,
    id: userId,
  } = await getUserSession()

  const t = await getTranslations({ locale, namespace: 'Dashboard.Account' })

  return (
    <>
      <Typography isFullWidth size="xxl" tag="h1" weight="semiBold">
        {t('title')}
      </Typography>
      <div className={styles.container}>
        <div className={styles.fieldsContainer}>
          {/* TODO: refactor fieldsContainer common to all dashboard pages */}
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
        <DeleteAccountButton className={styles.cta} userId={userId} />
      </div>
    </>
  )
}

export default DashboardAccountPage
