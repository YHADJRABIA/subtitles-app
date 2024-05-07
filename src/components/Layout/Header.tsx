import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'
import LanguageToggler from './LanguageToggler'

const Header = () => {
  const t = useTranslations('Navigation')

  const links = [
    {
      url: '/',
      label: t('home'),
    },
    {
      url: '/register',
      label: 'Register',
    },
  ]
  return (
    <header>
      <nav>
        {links.map((link, id) => (
          <Link key={id} href={link.url}>
            {link.label}
          </Link>
        ))}
        <LanguageToggler />
      </nav>
    </header>
  )
}

export default Header
