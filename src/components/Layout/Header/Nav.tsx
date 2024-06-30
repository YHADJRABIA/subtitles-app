'use client'
import { useTranslations } from 'next-intl'
import React from 'react'
import styles from './Nav.module.scss'
import cn from 'classnames'
import Typography from '@/components/UI/Typography'
import { usePathname } from '@/lib/i18n/navigation'

interface PropTypes {
  className?: string
}

const Nav = ({ className }: PropTypes) => {
  const t = useTranslations('Navigation')
  const currentPath = usePathname()

  const links = [
    {
      url: '/',
      label: t('home'),
    },
    {
      url: '/dashboard',
      label: t('dashboard'),
    },
    {
      url: '/dashboard',
      label: t('dashboard'),
    },
    {
      url: '/dashboard',
      label: t('dashboard'),
    },
    {
      url: '/dashboard',
      label: t('dashboard'),
    },
  ]
  return (
    <nav aria-label="Main menu" className={cn(styles.root, className)}>
      <ul className={styles.links}>
        {links.map((link, id) => {
          const isActive = link.url === currentPath
          return (
            <li key={id}>
              <Typography
                weight={isActive ? 'semiBold' : undefined}
                className={cn(styles.link, { [styles.isActive]: isActive })}
                href={link.url}
              >
                {link.label}
              </Typography>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Nav
