import { handleLogout } from '@/actions/auth'
import { getErrorMessage } from '@/utils/errors'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import {
  GrHomeRounded as HomeIcon,
  GrCircleQuestion as AboutIcon,
  GrUserSettings as DashboardIcon,
  GrPowerShutdown as LogoutIcon,
  GrKey as LoginIcon,
  GrUserExpert as RegisterIcon,
} from 'react-icons/gr'

import { LuSubtitles as SubtitlesIcon } from 'react-icons/lu'

interface PropTypes {
  isConnected: boolean
}

/**
 * Returns nav links to show based on authentication status
 **/
const useNavLinks = ({ isConnected }: PropTypes) => {
  const t = useTranslations('Navigation')

  const [isLoggingOut, setIsLoggingOut] = useState(false)

  // Prevent multiple clicks
  const handleLogoutClick = async () => {
    if (isLoggingOut) return

    setIsLoggingOut(true)
    try {
      await handleLogout()
    } catch (err) {
      console.error(getErrorMessage(err))
    } finally {
      setIsLoggingOut(false)
    }
  }
  const navLinks = [
    {
      url: '/',
      label: t('home'),
      icon: HomeIcon,
    },
    {
      url: '/about',
      label: t('about'),
      icon: AboutIcon,
    },
    {
      url: '/series/patrul', // TODO: switch page to /series when page is finished
      label: t('series'),
      icon: SubtitlesIcon,
    },
    ...(isConnected
      ? [
          {
            url: '/dashboard',
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
            url: '/register',
            label: t('register'),
            icon: RegisterIcon,
          },
          {
            url: '/login',
            label: t('login'),
            icon: LoginIcon,
          },
        ]),
  ].filter(Boolean)

  return navLinks
}

export default useNavLinks
