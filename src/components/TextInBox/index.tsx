import React from 'react'
import styles from './TextInBox.module.scss'
import cn from 'classnames'
import Typography from '../UI/Typography'
import { Info } from '@/types/info'
import { IconType } from 'react-icons/lib'

interface PropTypes {
  label: string
  icon: IconType
  type?: Info
  className?: string
  isShown: boolean
}

const TextInBox = ({
  label,
  icon: Icon,
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
          <Icon className={styles.icon} />
          <Typography size="xs" className={styles.label} title={label}>
            {label}
          </Typography>
        </>
      )}
    </div>
  )
}

export default TextInBox
