'use client'

import React, { useState } from 'react'
import styles from './UserMenu.module.scss'
import {
  MdDashboard as DashboardIcon,
  MdLogin as LoginIcon,
  MdLogout as LogoutIcon,
  MdPersonAdd as RegisterIcon,
} from 'react-icons/md'
import { PiUserCircleLight as UserIcon } from 'react-icons/pi'
import { useTranslations } from 'next-intl'
import { handleLogout } from '@/actions/auth'
import useIsOnDesktop from '@/hooks/useIsOnDesktop'
import {
  Dropdown,
  DropdownItem,
  DropdownDivider,
} from '@/components/UI/Dropdown'

interface PropTypes {
  isConnected: boolean
}

const UserMenu = ({ isConnected }: PropTypes) => {
  const t = useTranslations('Navigation')
  const isOnDesktop = useIsOnDesktop()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  if (!isOnDesktop) return null

  const handleLogoutClick = async () => {
    if (isLoggingOut) return
    setIsLoggingOut(true)
    try {
      await handleLogout()
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <Dropdown
      className={styles.root}
      trigger={<UserIcon className={styles.avatar} size={32} />}
    >
      {isConnected ? (
        <>
          <DropdownItem href="/dashboard" icon={<DashboardIcon />}>
            {t('dashboard')}
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem
            disabled={isLoggingOut}
            icon={<LogoutIcon />}
            onClick={handleLogoutClick}
          >
            {t('logout')}
          </DropdownItem>
        </>
      ) : (
        <>
          <DropdownItem href="/login" icon={<LoginIcon />}>
            {t('login')}
          </DropdownItem>
          <DropdownItem href="/register" icon={<RegisterIcon />}>
            {t('register')}
          </DropdownItem>
        </>
      )}
    </Dropdown>
  )
}

export default UserMenu
