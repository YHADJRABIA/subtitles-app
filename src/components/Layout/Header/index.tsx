import React from 'react'
import LanguageMenu from '../LanguageMenu'
import styles from './Header.module.scss'
import Nav from './Nav'
import AuthSection from './AuthSection'
import Logo from './Logo'

interface PropTypes {
  isConnected: boolean
}

const Header = ({ isConnected }: PropTypes) => {
  return (
    <header className={styles.root}>
      <Logo />
      <Nav className={styles.nav} />
      <AuthSection showAccount={isConnected} />
      <LanguageMenu className={styles.languageMenu} />
    </header>
  )
}

export default Header
