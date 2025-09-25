import React from 'react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getUserSession } from '@/utils/session'
import Typography from '@/components/UI/Typography'
import styles from './page.module.scss'

import { Metadata } from 'next/types'
import { MetaDataProps } from '@/app/[locale]/layout'

import TwoFactorAuth from '../_components/TwoFactorAuth'

export const generateMetadata = async ({
  params,
}: MetaDataProps): Promise<Metadata> => {
  const { locale } = await params
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.Protected.Settings',
  })

  return { title: t('title'), description: t('description') }
}

const DashboardSettingsPage = async ({ params }: MetaDataProps) => {
  const { locale } = await params

  setRequestLocale(locale)
  const { /* favoriteLocale,  */ isTwoFactorEnabled } = await getUserSession()

  const t = await getTranslations({ locale, namespace: 'Dashboard.Settings' })

  return (
    <>
      <Typography isFullWidth size="xxl" tag="h1" weight="semiBold">
        {t('title')}
      </Typography>

      <div className={styles.section}>
        <Typography size="xs" weight="semiBold">
          {t('preferred_language')}
        </Typography>
        <TwoFactorAuth isOn={isTwoFactorEnabled} />
      </div>
    </>
  )
}

export default DashboardSettingsPage
