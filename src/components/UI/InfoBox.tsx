import React, { ReactNode } from 'react'

import styles from './InfoBox.module.scss'

import cn from 'classnames'

interface PropTypes {
  label: string
  icon: ReactNode
  type?: 'success' | 'info' | 'error'
  style?: string
}

const InfoBox = ({ label, icon, type = 'info', style }: PropTypes) => {
  const isShown = label && icon

  return (
    isShown && (
      <div
        className={cn(
          styles[type],
          'hidden',
          styles.root,
          { visible: isShown },
          style
        )}
      >
        <div className={styles.icon}>{icon}</div>
        <p className={styles.label}>{label}</p>
      </div>
    )
  )
}

export default InfoBox
