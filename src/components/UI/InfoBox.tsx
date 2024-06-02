import React, { CSSProperties, ReactNode } from 'react'

import styles from './InfoBox.module.scss'

import cn from 'classnames'
import Typography from './Typography'
import { Info } from '@/types/info'

interface PropTypes {
  label: string
  icon: ReactNode
  type?: Info
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
          <Typography className={styles.label} title={label}>
            {label}
          </Typography>
        </>
      )}
    </div>
  )
}

export default InfoBox
