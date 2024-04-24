import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'
import LanguageToggler from './LanguageToggler'

const Header = () => {
  const t = useTranslations('Navigation')
  return (
    <header>
      <nav>
        <Link href={'/'}>{t('home')}</Link>
        <LanguageToggler />
      </nav>
    </header>
  )
}

export default Header
