'use client'
import React, { useEffect, useState } from 'react'
import styles from './Nav.module.scss'
import cn from 'classnames'
import { usePathname } from '@/lib/i18n/navigation'
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
        toggled={toggled}
        setToggled={setToggled}
        className={styles.burgerMenu}
      />

      <div className={cn(styles.menu, { [styles.toggled]: toggled })}>
        <ul className={styles.links}>
          {navLinks.map((link, id) => {
            const isActive = link?.url === currentPath
            return (
              <NavLink
                key={id}
                link={link}
                isActive={isActive}
                onClick={isActive ? handleCloseNav : undefined} // Close nav menu if already on target route
              />
            )
          })}
        </ul>
        <Separator
          color="var(--secondary-gray-color)"
          className={styles.separator}
        />
        {/* TODO: Reuse later  <AuthSection showAccount={isConnected} className={styles.authSection} /> */}
        <div className={styles.bottomSection}>
          <LanguageMenu isInverted={!isOnDesktop} />

          <LinkButton
            size="xs"
            weight="semiBold"
            isFullWidth={false}
            icon={{ src: SupportIcon }}
            link={{
              href: SUPPORT_LINK,
              openInNewTab: true,
            }}
          >
            {t('donate')}
          </LinkButton>
        </div>
      </div>
    </nav>
  )
}

export default Nav
