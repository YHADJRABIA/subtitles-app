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
  customStyle,
  isShown,
}: PropTypes) => {
  return (
    <div
      className={cn(
        styles[type],
        'hidden',
        styles.root,
        { visible: isShown },
        customStyle
      )}
    >
      {isShown && (
        <>
          <div className={styles.icon}>{icon}</div>
          <p className={styles.label}>{label}</p>
        </>
      )}
    </div>
  )
}

export default InfoBox
