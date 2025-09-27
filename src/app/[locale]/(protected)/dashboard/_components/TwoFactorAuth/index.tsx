'use client'
import Typography from '@/components/UI/Typography'
import styles from './TwoFactorAuth.module.scss'
import React, { useTransition } from 'react'
import SwitchButton from '@/components/SwitchButton'
import { useSession } from 'next-auth/react'
import { handleToggleTwoFactorAuth } from '@/actions/user'
import { notify } from '@/lib/toastify'
import { useTranslations } from 'next-intl'
import { getErrorMessage } from '@/utils/errors'

interface PropTypes {
  isActive: boolean
}

const TwoFactorAuth = ({ isActive }: PropTypes) => {
  const t = useTranslations('Dashboard.Settings')
  const { update } = useSession()
  const [isPending, startTransition] = useTransition()

  const handleUpdateSession = async (isOn: boolean) => {
    await update({ isTwoFactorEnabled: isOn })
  }

  const handleToggle = (isOn: boolean) => {
    startTransition(async () => {
      try {
        const res = await handleToggleTwoFactorAuth(isOn)
        await handleUpdateSession(isOn)
        notify('success', res.data?.message ?? '')
      } catch (err) {
        notify('error', await getErrorMessage(err))
        console.error('TwoFactorAuth toggle error: ', getErrorMessage(err))
      }
    })
  }

  return (
    <div className={styles.root}>
      <Typography size="xs" weight="semiBold">
        {t('two_factor_auth')}
      </Typography>
      <SwitchButton
        isActive={isActive}
        isDisabled={isPending}
        onToggle={handleToggle}
      />
    </div>
  )
}

export default TwoFactorAuth
