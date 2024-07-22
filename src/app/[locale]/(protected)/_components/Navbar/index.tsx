'use client'
import React from 'react'
import styles from './Navbar.module.scss'
import {
  LuUserSquare2 as OverviewIcon,
  LuSettings as SettingsIcon,
  LuInfo as InfoIcon,
} from 'react-icons/lu'
import { useTranslations } from 'next-intl'
import NavLink from './NavLink'
import { usePathname } from '@/lib/i18n/navigation'

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
      <ul>
        {links.map((link, id) => {
          const isActive = link?.url === currentPath
          return <NavLink key={id} link={link} isActive={isActive} />
        })}
      </ul>
    </nav>
  )
}

export default Navbar
