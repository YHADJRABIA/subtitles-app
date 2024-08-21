import React, { CSSProperties } from 'react'
import styles from './Header.module.scss'
import Nav from './Nav'
import Logo from './Logo'
import cn from 'classnames'

interface PropTypes {
  isConnected: boolean
  className?: string
  customStyle?: CSSProperties
}

const Header = ({ isConnected, className, customStyle }: PropTypes) => {
  return (
    <header className={cn(styles.root, className)} style={customStyle}>
      <Logo isInvertedColor size={50} />
      <Nav className={styles.nav} isConnected={isConnected} />
    </header>
  )
}

export default Header
