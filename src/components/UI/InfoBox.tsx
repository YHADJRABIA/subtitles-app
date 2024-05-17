import React, { CSSProperties, ReactNode } from 'react'

import styles from './InfoBox.module.scss'

import cn from 'classnames'

interface PropTypes {
  label: string
  icon: ReactNode
  type?: 'success' | 'info' | 'error'
  customStyle?: CSSProperties
  isShown: boolean
}

const InfoBox = ({
  label,
  icon,
  type = 'info',
  customStyle: style,
  isShown,
}: PropTypes) => {
  return (
    <div
      aria-hidden={!isShown}
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
}

export default InfoBox
