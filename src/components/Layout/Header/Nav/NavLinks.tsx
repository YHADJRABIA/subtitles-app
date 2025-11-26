'use client'
import React from 'react'
import NavLink from './NavLink'
import useNavLinks from '@/hooks/useNavLinks'
import { usePathname } from '@/i18n/routing'

interface PropTypes {
  isConnected: boolean
  onActiveLinkClick?: () => void
}

const NavLinks = ({ isConnected, onActiveLinkClick }: PropTypes) => {
  const currentPath = usePathname()
  const navLinks = useNavLinks({ isConnected })

  return (
    <>
      {navLinks.map(link => {
        const isActive = link?.url === currentPath

        return (
          <NavLink
            isActive={isActive}
            key={link.label}
            link={link}
            onClick={isActive ? onActiveLinkClick : undefined}
          />
        )
      })}
    </>
  )
}

export default NavLinks
