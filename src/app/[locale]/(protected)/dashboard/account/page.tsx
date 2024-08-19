import React from 'react'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import styles from './page.module.scss'
import Typography from '@/components/UI/Typography'
import { getUserSession } from '@/utils/session'
import { formatDate } from '@/utils/date'
import DeleteAccountButton from '../_components/DeleteAccountButton'
import { Metadata } from 'next/types'

export const generateMetadata = async ({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> => {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.Protected.Account',
  })

  return {
    title: t('title'),
    description: t('description'),
  }
}

const DashboardAccountPage = async ({
  params: { locale },
}: {
  params: { locale: string }
}) => {
  unstable_setRequestLocale(locale)
  const { creationDate, lastUpdateDate } = await getUserSession()

  const t = await getTranslations({ locale, namespace: 'Dashboard.Account' })

  return (
    <>
      <Typography
        isFullWidth
        tag="h1"
        size="xxl"
        weight="semiBold"
        className={styles.title}
      >
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
              <Typography size="xxs">{formatDate(creationDate)}</Typography>
            </div>
          )}
          {lastUpdateDate && ( // TODO: remove condition when also available via Google signin
            <div className={styles.field}>
              <Typography weight="semiBold" size="xs">
                {t('last_update')}
              </Typography>
              <Typography size="xxs">{formatDate(lastUpdateDate)}</Typography>
            </div>
          )}
        </div>
        <DeleteAccountButton
          className={styles.cta}
          label={t('delete_account')}
        />
      </div>
    </>
  )
}

export default DashboardAccountPage
