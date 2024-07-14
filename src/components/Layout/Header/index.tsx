import React from 'react'
import styles from './Header.module.scss'
import Nav from './Nav'
import Logo from './Logo'

interface PropTypes {
  isConnected: boolean
}

const Header = ({ isConnected }: PropTypes) => {
  return (
    <header className={styles.root}>
      <Logo isInvertedColor size={50} />

      <Nav className={styles.nav} isConnected={isConnected} />
    </header>
  )
}

export default Header
