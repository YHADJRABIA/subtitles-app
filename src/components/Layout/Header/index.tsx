import React from 'react'
import styles from './Header.module.scss'
import Nav from './Nav'
import Logo from './Logo'
import cn from 'classnames'

interface PropTypes {
  isConnected: boolean
  className?: string
}

const Header = ({ isConnected, className }: PropTypes) => {
  return (
    <header className={cn(styles.root, className)}>
      <Logo isInvertedColor size={50} />
      <Nav className={styles.nav} isConnected={isConnected} />
    </header>
  )
}

export default Header
