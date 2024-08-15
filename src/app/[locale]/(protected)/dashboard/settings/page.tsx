import React from 'react'
import { getTranslations } from 'next-intl/server'
import styles from './page.module.scss'
import { getNextLocale } from '@/utils/cookies'
/* import { getUserSession } from '@/utils/session' */
import Typography from '@/components/UI/Typography'
/* import SwitchButton from '@/components/SwitchButton' */

import { Metadata } from 'next/types'
import UnderDevelopment from '@/components/UnderDevelopment'

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = getNextLocale()
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.Protected.Settings',
  })

  return {
    title: t('title'),
    description: t('description'),
  }
}

const DashboardSettingsPage = async () => {
  /*   const { favoriteLocale, isTwoFactorEnabled } = await getUserSession() */
  const locale = getNextLocale()

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
