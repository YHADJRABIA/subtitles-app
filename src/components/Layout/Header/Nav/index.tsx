'use client'
import React, { useEffect, useState } from 'react'
import styles from './Nav.module.scss'
import cn from 'classnames'
import { usePathname } from '@/i18n/routing'
import BurgerMenu from '../BurgerMenu'
import LanguageMenu from '../../LanguageMenu'
import Separator from '@/components/Separator'
import useIsOnDesktop from '@/hooks/useIsOnDesktop'
import NavLinks from './NavLinks'
import { LinkButton } from '@/components/UI/Button/LinkButton'
import { SUPPORT_LINK } from '@/utils/constants'
import { useTranslations } from 'next-intl'
import { SiBuymeacoffee as SupportIcon } from 'react-icons/si'
import UserMenu from '../UserMenu'
import { useSession } from 'next-auth/react'
import { handleLogout } from '@/actions/auth'

interface PropTypes {
  isConnected: boolean
  className?: string
}

const Nav = ({ className, isConnected }: PropTypes) => {
  const t = useTranslations('Navigation')
  const currentPath = usePathname()
  const isOnDesktop = useIsOnDesktop()
  const [toggled, setToggled] = useState(false)
  const { data: session } = useSession()
  const avatarSrc = session?.user?.image ?? null

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
          <NavLinks
            isConnected={isConnected}
            onActiveLinkClick={handleCloseNav}
          />
        </ul>
        <Separator className={styles.separator} />
        <div className={styles.bottomSection}>
          <UserMenu
            avatarSrc={avatarSrc}
            isConnected={isConnected}
            onLogout={handleLogout}
          />
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
