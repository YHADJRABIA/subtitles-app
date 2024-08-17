import React from 'react'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import styles from './page.module.scss'
/* import { getUserSession } from '@/utils/session' */
import Typography from '@/components/UI/Typography'
/* import SwitchButton from '@/components/SwitchButton' */

import { Metadata } from 'next/types'
import UnderDevelopment from '@/components/UnderDevelopment'
import { MetaDataProps } from '@/app/[locale]/layout'

export const generateMetadata = async ({
  params: { locale },
}: MetaDataProps): Promise<Metadata> => {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.Protected.Settings',
  })

  return {
    title: t('title'),
    description: t('description'),
  }
}

const DashboardSettingsPage = async ({ params: { locale } }: MetaDataProps) => {
  unstable_setRequestLocale(locale)
  /*   const { favoriteLocale, isTwoFactorEnabled } = await getUserSession() */

  const t = await getTranslations({ locale, namespace: 'Dashboard.Settings' })

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

      {/*   <div className={styles.section}> // TODO: finish development
        <Typography weight="semiBold" size="xs">
          {t('preferred_language')}
        </Typography>
        <div className={styles.element}>
          <Typography weight="semiBold" size="xs">
            {t('two_factor_auth')}
          </Typography>
          <SwitchButton
            isActive={isTwoFactorEnabled}
            //  onToggle={() => console.log('TEST')} 
          />
        </div>
        <Typography
          weight="semiBold"
          size="xs"
          color="var(--primary-blue-color)"
        >
          {t('edit_password')}
        </Typography>

        <Typography
          weight="semiBold"
          size="xs"
          color="var(--primary-blue-color)"
        >
          {t('edit_email')}
        </Typography>
      </div> */}
    </div>
  )
}

export default DashboardSettingsPage