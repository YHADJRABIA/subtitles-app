import Typography from '@/components/UI/Typography'
import React from 'react'
import cn from 'classnames'
import styles from './NavLink.module.scss'
import { IconType } from 'react-icons/lib'

export type NavLinkType = {
  icon: IconType
  label: string
  url?: string
  onClick?: () => void
}

interface PropTypes {
  isActive: boolean
  link: NavLinkType
}

const NavLink = ({ isActive, link }: PropTypes) => {
  const Icon = link.icon
  return (
    <li className={styles.root}>
      <Icon
        size={16}
        color={
          isActive
            ? 'var(--primary-yellow-color)'
            : 'var(--primary-white-color)'
        }
        className={styles.icon}
      />

      <Typography
        size="s"
        weight={isActive ? 'semiBold' : undefined}
        className={cn(styles.label, { [styles.isActive]: isActive })}
        link={{ href: link?.url ?? null }}
        onClick={link.onClick}
      >
        {link.label}
      </Typography>
    </li>
  )
}

export default NavLink
