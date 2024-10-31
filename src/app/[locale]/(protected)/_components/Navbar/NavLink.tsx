import { NavLinkType } from '@/components/Layout/Header/Nav/NavLink'
import styles from './NavLink.module.scss'
import React from 'react'
import Typography from '@/components/UI/Typography'
import cn from 'classnames'
import { Link } from '@/i18n/routing'

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
        className={cn(styles.root, className, { [styles.active]: isActive })}
        href={link.url ?? '/dashboard'}
      >
        <Icon className={styles.icon} size={16} />
        <Typography size="xxs" weight={isActive ? 'semiBold' : undefined}>
          {link.label}
        </Typography>
      </Link>
    </li>
  )
}

export default NavLink
