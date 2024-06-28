import Link from '@/components/Link'
import { useTranslations } from 'next-intl'
import React from 'react'
import styles from './Nav.module.scss'
import cn from 'classnames'

interface PropTypes {
  className?: string
}

const Nav = ({ className }: PropTypes) => {
  const t = useTranslations('Navigation')

  const links = [
    {
      url: '/',
      label: t('home'),
    },
  ]
  return (
    <nav aria-label="Main menu" className={cn(styles.root, className)}>
      {links.map((link, id) => (
        <Link key={id} href={link.url}>
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

export default Nav
