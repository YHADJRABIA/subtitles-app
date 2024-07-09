import Typography from '@/components/UI/Typography'
import React, { ElementType } from 'react'
import cn from 'classnames'
import styles from './NavLink.module.scss'

interface PropTypes {
  isActive: boolean
  link: { icon: ElementType; label: string; url?: string; onClick?: () => void }
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
        weight={isActive ? 'semiBold' : undefined}
        className={cn(styles.label, { [styles.isActive]: isActive })}
        href={link?.url}
        onClick={link.onClick}
      >
        {link.label}
      </Typography>
    </li>
  )
}

export default NavLink
