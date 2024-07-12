import React from 'react'
import LanguageMenu from '../LanguageMenu'
import styles from './Header.module.scss'
import Nav from './Nav/Nav'
import AuthSection from './AuthSection'
import Logo from './Logo'

interface PropTypes {
  isConnected: boolean
}

const Header = ({ isConnected }: PropTypes) => {
  return (
    <header className={styles.root}>
      <Logo isInvertedColor size={50} />

      <Nav className={styles.nav} isConnected={isConnected} />
      {/*       <AuthSection showAccount={isConnected} className={styles.authSection} /> */}
      {/*  <LanguageMenu className={styles.languageMenu} /> */}
    </header>
  )
}

export default Header
