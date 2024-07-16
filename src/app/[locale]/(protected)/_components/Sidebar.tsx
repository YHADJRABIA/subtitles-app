import React from 'react'
import styles from './Sidebar.module.scss'
import cn from 'classnames'

interface PropTypes {
  className?: string
}

const Sidebar = ({ className }: PropTypes) => {
  return <aside className={cn(styles.root, className)}></aside>
}

export default Sidebar
