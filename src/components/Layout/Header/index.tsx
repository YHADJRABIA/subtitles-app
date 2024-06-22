import React from 'react'
import LanguageMenu from '../LanguageMenu'
import styles from './Header.module.scss'
import Nav from './Nav'

const Header = () => {
  return (
    <header className={styles.root}>
      <Nav />
      <LanguageMenu />
    </header>
  )
}

export default Header
