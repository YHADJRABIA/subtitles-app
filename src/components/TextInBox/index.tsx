import React, { useRef, useEffect, useState } from 'react'
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

const VERTICAL_PADDING = 20 // 2 rem

const TextInBox = ({
  label,
  icon: Icon,
  type = 'info',
  className,
  isShown,
}: PropTypes) => {
  const contentRef = useRef<HTMLDivElement | null>(null)
  const [maxHeight, setMaxHeight] = useState(0)

  useEffect(() => {
    if (isShown && contentRef.current) {
      setMaxHeight(contentRef.current.scrollHeight + VERTICAL_PADDING) // Vertical padding of root, to not cram container
    } else {
      setMaxHeight(0)
    }
  }, [isShown, label])

  return (
    <div
      className={cn(
        styles[type],
        styles.root,
        'hidden',
        { visible: isShown },
        className
      )}
      ref={contentRef}
      style={{ maxHeight: `${maxHeight}px` }}
    >
      {isShown && (
        <>
          <Icon className={styles.icon} />
          <Typography className={styles.label} size="xs" title={label}>
            {label}
          </Typography>
        </>
      )}
    </div>
  )
}

export default TextInBox
