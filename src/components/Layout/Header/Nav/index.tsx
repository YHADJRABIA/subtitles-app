'use client'
import React, { useEffect, useState } from 'react'
import styles from './Nav.module.scss'
import cn from 'classnames'
import { usePathname } from '@/i18n/routing'
import BurgerMenu from '../BurgerMenu'
import LanguageMenu from '../../LanguageMenu'
import Separator from '@/components/Separator'
import NavLink from './NavLink'
import useNavLinks from '@/hooks/useNavLinks'
import useIsOnDesktop from '@/hooks/useIsOnDesktop'
import { LinkButton } from '@/components/UI/Button/LinkButton'
import { SUPPORT_LINK } from '@/utils/constants'
import { useTranslations } from 'next-intl'
import { SiBuymeacoffee as SupportIcon } from 'react-icons/si'
import { hasMatchingFirstSlug } from '@/utils/paths'
import { Pathname } from '@/types/pathnames'

interface PropTypes {
  isConnected: boolean
  className?: string
}

const Nav = ({ className, isConnected }: PropTypes) => {
  const t = useTranslations('Navigation')
  const currentPath = usePathname()
  const isOnDesktop = useIsOnDesktop()
  const [toggled, setToggled] = useState(false)
  const navLinks = useNavLinks({ isConnected })

  const handleCloseNav = () => {
    if (toggled === false) return
    setToggled(false)
  }

  // Close nav menu when path has changed
  useEffect(() => {
    handleCloseNav()
  }, [currentPath]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <nav aria-label="Main menu" className={cn(styles.root, className)}>
      <BurgerMenu
        className={styles.burgerMenu}
        setToggled={setToggled}
        toggled={toggled}
      />

      <div className={cn(styles.menu, { [styles.toggled]: toggled })}>
        <ul className={styles.links}>
          {navLinks.map(link => {
            const isActive = hasMatchingFirstSlug(
              link?.url as Pathname,
              currentPath
            )
            return (
              <NavLink
                isActive={isActive}
                key={link.label}
                link={link}
                onClick={isActive ? handleCloseNav : undefined} // Close nav menu if already on target route
              />
            )
          })}
        </ul>
        <Separator className={styles.separator} />
        {/* TODO: Reuse later  <AuthSection showAccount={isConnected} className={styles.authSection} /> */}
        <div className={styles.bottomSection}>
          <LanguageMenu isInverted={!isOnDesktop} />

          <LinkButton
            icon={{ src: SupportIcon }}
            isFullWidth={false}
            link={{
              href: SUPPORT_LINK,
              openInNewTab: true,
            }}
            size="xs"
            weight="semiBold"
          >
            {t('donate')}
          </LinkButton>
        </div>
      </div>
    </nav>
  )
}

export default Nav
