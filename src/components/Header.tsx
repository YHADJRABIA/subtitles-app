import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'
import LanguageToggler from './LanguageToggler'
import styles from './Header.module.scss'

const Header = () => {
  const t = useTranslations('Navigation')
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href={'/'}>{t('home')}</Link>
        <LanguageToggler />
      </nav>
    </header>
  )
}

export default Header
