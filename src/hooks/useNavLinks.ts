import { handleLogout } from '@/actions/auth'
import { getErrorMessage } from '@/utils/errors'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import useIsOnDesktop from './useIsOnDesktop'
import { routes } from '@/routes/routes'

import {
  GrHomeRounded as HomeIcon,
  GrCircleQuestion as AboutIcon,
  GrUserSettings as DashboardIcon,
  GrPowerShutdown as LogoutIcon,
  GrLogin as LoginIcon,
  GrUserExpert as RegisterIcon,
} from 'react-icons/gr'

import { LuMessageSquareText as SubtitlesIcon } from 'react-icons/lu'

interface PropTypes {
  isConnected: boolean
}

/**
 * Returns nav links based on authentication status
 **/
const useNavLinks = ({ isConnected }: PropTypes) => {
  const t = useTranslations('Navigation')

  const isOnDesktop = useIsOnDesktop()

  const [isLoggingOut, setIsLoggingOut] = useState(false)

  // Prevent multiple clicks
  const handleLogoutClick = async () => {
    if (isLoggingOut) return

    setIsLoggingOut(true)
    try {
      await handleLogout()
    } catch (err) {
      console.error('Error logging out:', getErrorMessage(err))
    } finally {
      setIsLoggingOut(false)
    }
  }

  const baseLinks = [
    {
      url: routes['/'],
      label: t('home'),
      icon: HomeIcon,
    },
    {
      url: routes['/about'],
      label: t('about'),
      icon: AboutIcon,
    },
    {
      url: routes['/series'],
      label: t('series'),
      icon: SubtitlesIcon,
    },
  ]

  const authLinks = isConnected
    ? [
        {
          url: routes['/dashboard'],
          label: t('dashboard'),
          icon: DashboardIcon,
        },
        {
          label: t('logout'),
          icon: LogoutIcon,
          onClick: handleLogoutClick,
        },
      ]
    : [
        {
          url: routes['/register'],
          label: t('register'),
          icon: RegisterIcon,
        },
        {
          url: routes['/login'],
          label: t('login'),
          icon: LoginIcon,
        },
      ]

  const navLinks = (
    isOnDesktop ? baseLinks : [...baseLinks, ...authLinks]
  ).filter(Boolean)

  return navLinks
}

export default useNavLinks
