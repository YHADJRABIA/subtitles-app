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
  link: NavLinkType
  isActive: boolean
  onClick?: () => void
  className?: string
}

const NavLink = ({ isActive, link, onClick, className }: PropTypes) => {
  const Icon = link.icon

  const handleClick = () => {
    link.onClick?.()
    onClick?.()
  }
  return (
    <li
      className={cn(styles.root, className, { [styles.isActive]: isActive })}
      onClick={handleClick}
    >
      <Icon className={styles.icon} size={16} />

      <Typography
        link={{ href: link?.url ?? null }}
        size="s"
        weight={isActive ? 'semiBold' : undefined}
      >
        {link.label}
      </Typography>
    </li>
  )
}

export default NavLink
