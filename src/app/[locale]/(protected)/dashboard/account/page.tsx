import React from 'react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import styles from './page.module.scss'
import Typography from '@/components/UI/Typography'
import { getUserSession } from '@/utils/session'
import DeleteAccountButton from '../_components/DeleteAccountButton'
import { Metadata } from 'next/types'
import { MetaDataProps } from '@/app/[locale]/layout'
import AccountInfo from '../_components/AccountInfo'

export const generateMetadata = async ({
  params: { locale },
}: MetaDataProps): Promise<Metadata> => {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.Protected.Account',
  })

  return { title: t('title'), description: t('description') }
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
        <AccountInfo
          className={styles.info}
          creationDate={creationDate}
          lastLoginDate={lastLoginDate}
          lastUpdateDate={lastUpdateDate}
        />
        <DeleteAccountButton className={styles.cta} userId={userId} />
      </div>
    </>
  )
}

export default DashboardAccountPage
