import Link from '@/components/Link'
import { useTranslations } from 'next-intl'
import React from 'react'
import styles from './Nav.module.scss'

const Nav = () => {
  const t = useTranslations('Navigation')

  const links = [
    {
      url: '/',
      label: t('home'),
    },
    {
      url: '/register',
      label: 'Register',
    },
  ]
  return (
    <nav className={styles.root}>
      {links.map((link, id) => (
        <Link key={id} href={link.url}>
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

export default Nav
