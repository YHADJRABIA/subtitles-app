import { NavLinkType } from '@/components/Layout/Header/Nav/NavLink'
import styles from './NavLink.module.scss'
import React from 'react'
import Typography from '@/components/UI/Typography'
import cn from 'classnames'
import { Link } from '@/lib/i18n/navigation'

interface PropTypes {
  link: NavLinkType
  isActive: boolean
  className?: string
}

// TODO: add type and unify with homepage's navlink

const NavLink = ({ link, isActive, className }: PropTypes) => {
  const Icon = link.icon
  return (
    <li>
      <Link
        href={link.url ?? '/dashboard'}
        className={cn(styles.root, className, { [styles.active]: isActive })}
      >
        <Icon size={16} className={styles.icon} />
        <Typography size="xxs" weight={isActive ? 'semiBold' : undefined}>
          {link.label}
        </Typography>
      </Link>
    </li>
  )
}

export default NavLink
