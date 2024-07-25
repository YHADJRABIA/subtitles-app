import { handleLogout } from '@/actions/auth'
import { useTranslations } from 'next-intl'

import {
  GrHomeRounded as HomeIcon,
  GrCircleQuestion as AboutIcon,
  GrUserSettings as DashboardIcon,
  GrLogout as LogoutIcon,
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
      url: '/subtitles',
      label: t('subtitles'),
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
            onClick: handleLogout,
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
