import Typography from '@/components/UI/Typography'
import React from 'react'
import cn from 'classnames'
import styles from './NavLink.module.scss'
import { NavLinkProps } from '@/types/nav-link'

const NavLink = ({ isActive, link, onClick, className }: NavLinkProps) => {
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
      <Typography
        link={{ href: link?.url ?? null }}
        size="s"
        weight={isActive ? 'semiBold' : undefined}
      >
        <Icon className={styles.icon} size={16} />
        {link.label}
      </Typography>
    </li>
  )
}

export default NavLink
