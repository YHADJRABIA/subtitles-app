'use client'

import React, { useRef, useState } from 'react'
import styles from './UserMenu.module.scss'
import {
  MdDashboard as DashboardIcon,
  MdLogin as LoginIcon,
  MdLogout as LogoutIcon,
  MdPersonAdd as RegisterIcon,
} from 'react-icons/md'
import { PiUserCircleLight as UserIcon } from 'react-icons/pi'
import { useTranslations } from 'next-intl'
import Avatar from '@/components/Avatar/Avatar'
import useIsOnDesktop from '@/hooks/useIsOnDesktop'
import {
  Dropdown,
  DropdownItem,
  DropdownDivider,
} from '@/components/UI/Dropdown'

interface PropTypes {
  isConnected: boolean
  avatarSrc?: string | null
  showDashboardButton?: boolean
  onLogout: () => Promise<void> | void
}

const UserMenu = ({
  avatarSrc,
  isConnected,
  showDashboardButton,
  onLogout,
}: PropTypes) => {
  const t = useTranslations('Navigation')
  const isOnDesktop = useIsOnDesktop()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const isLoggingOutRef = useRef(false)

  if (!isOnDesktop) return null

  // Prevent multiple logout calls
  const handleLogout = async () => {
    if (isLoggingOutRef.current) return

    isLoggingOutRef.current = true
    setIsLoggingOut(true)

    try {
      await onLogout()
    } finally {
      isLoggingOutRef.current = false
      setIsLoggingOut(false)
    }
  }

  const userIcon = avatarSrc ? (
    <Avatar className={styles.avatar} size={32} src={avatarSrc} />
  ) : (
    <UserIcon className={styles.avatar} size={32} />
  )

  return (
    <Dropdown className={styles.root} trigger={userIcon}>
      {isConnected ? (
        <>
          {showDashboardButton && (
            <>
              <DropdownItem href="/dashboard" icon={<DashboardIcon />}>
                {t('dashboard')}
              </DropdownItem>
              <DropdownDivider />
            </>
          )}
          <DropdownItem
            disabled={isLoggingOut}
            icon={<LogoutIcon />}
            onClick={handleLogout}
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
