'use client'
import Typography from '@/components/UI/Typography'
import styles from './TwoFactorAuth.module.scss'
import React from 'react'
import SwitchButton from '@/components/SwitchButton'
import { useSession } from 'next-auth/react'
import { handleToggleTwoFactorAuth } from '@/actions/user'
import { useTranslations } from 'next-intl'

interface PropTypes {
  isOn: boolean
}

const TwoFactorAuth = ({ isOn }: PropTypes) => {
  const t = useTranslations('Dashboard.Settings')
  const { update } = useSession()

  const handleUpdateSession = async () => {
    await update({ isTwoFactorEnabled: isOn })
  }

  const handleToggle = () => {
    handleToggleTwoFactorAuth(!isOn)
    handleUpdateSession()
  }

  return (
    <div className={styles.root}>
      <Typography size="xs" weight="semiBold">
        {t('two_factor_auth')}
      </Typography>
      <SwitchButton isActive={isOn} onToggle={handleToggle} />
    </div>
  )
}

export default TwoFactorAuth
