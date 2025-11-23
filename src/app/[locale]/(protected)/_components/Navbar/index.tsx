'use client'
import React from 'react'
import styles from './Navbar.module.scss'
import {
  LuSquareUserRound as OverviewIcon,
  LuSettings as SettingsIcon,
  LuInfo as InfoIcon,
} from 'react-icons/lu'
import { useTranslations } from 'next-intl'
import NavLink from './NavLink'
import { usePathname } from '@/i18n/routing'

const Navbar = () => {
  const currentPath = usePathname()
  const t = useTranslations('Dashboard')
  const links = [
    {
      url: '/dashboard',
      label: t('overview'),
      icon: OverviewIcon,
    },
    {
      url: '/dashboard/settings',
      label: t('settings'),
      icon: SettingsIcon,
    },
    {
      url: '/dashboard/account',
      label: t('account'),
      icon: InfoIcon,
    },
  ]
  return (
    <nav className={styles.root}>
      <div className={styles.wrapper}>
        <ul>
          {links.map(link => {
            const isActive = link?.url === currentPath
            return <NavLink isActive={isActive} key={link.label} link={link} />
          })}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
