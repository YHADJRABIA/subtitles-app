import React from 'react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import LogoutButton from '@/components/Auth/LogoutButton'
import styles from './page.module.scss'
import { getUserSession } from '@/utils/session'
import Typography from '@/components/UI/Typography'
import { Metadata } from 'next/types'
import { MetaDataProps } from '../../layout'
import UserInfoForm from './_components/UserInfoForm'

export const generateMetadata = async ({
  params: { locale },
}: MetaDataProps): Promise<Metadata> => {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.Protected.Dashboard',
  })

  return { title: t('title'), description: t('description') }
}

const DashboardPage = async ({ params: { locale } }: MetaDataProps) => {
  setRequestLocale(locale)
  const { id, email, name, image } = await getUserSession()

  const t = await getTranslations({ locale, namespace: 'Dashboard' })

  return (
    <>
      <Typography isFullWidth size="xxl" tag="h1" weight="semiBold">
        {t('title')}
      </Typography>
      <UserInfoForm
        className={styles.userInfo}
        email={email}
        image={image}
        name={name}
        userId={id}
      />
      <LogoutButton className={styles.logoutCta} label={t('log_out')} />
    </>
  )
}

export default DashboardPage
