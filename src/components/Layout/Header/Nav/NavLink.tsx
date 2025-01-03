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
  onClick?: () => void
}

const NavLink = ({ isActive, link, onClick }: PropTypes) => {
  const Icon = link.icon
  return (
    <li
      className={cn(styles.root, { [styles.isActive]: isActive })}
      onClick={onClick}
    >
      <Icon className={styles.icon} size={16} />

      <Typography
        link={{ href: link?.url ?? null }}
        size="s"
        weight={isActive ? 'semiBold' : undefined}
        onClick={link.onClick}
      >
        {link.label}
      </Typography>
    </li>
  )
}

export default NavLink
