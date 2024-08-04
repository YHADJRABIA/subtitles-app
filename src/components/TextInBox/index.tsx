import React, { ReactNode } from 'react'
import styles from './TextInBox.module.scss'
import cn from 'classnames'
import Typography from '../UI/Typography'
import { Info } from '@/types/info'

interface PropTypes {
  label: string
  icon: ReactNode
  type?: Info
  className?: string
  isShown: boolean
}

const TextInBox = ({
  label,
  icon,
  type = 'info',
  className,
  isShown,
}: PropTypes) => {
  return (
    <div
      className={cn(
        styles[type],
        'hidden',
        styles.root,
        { visible: isShown },
        className
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

export default TextInBox
