import React, { ReactNode } from 'react'
import styles from './layout.module.scss'

interface PropTypes {
  children: ReactNode
}
const layout = ({ children }: PropTypes) => {
  return <main className={styles.root}>{children}</main>
}

export default layout
