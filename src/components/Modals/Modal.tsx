import React, { ReactNode } from 'react'
import cn from 'classnames'
import styles from './Modal.module.scss'
import Typography from '@/components/UI/Typography'
import { RiCloseLargeFill as CloseIcon } from 'react-icons/ri'

interface PropTypes {
  isOpen: boolean
  onClose: () => void
  title?: string
  className?: string
  children: ReactNode
}

const Modal = ({ isOpen, onClose, title, className, children }: PropTypes) => {
  if (!isOpen || !children) return null

  return (
    <div className={cn(styles.root, className)} onClick={onClose}>
      <div className={styles.container} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          {title && (
            <Typography
              className={styles.title}
              size="xl"
              tag="h2"
              weight="bold"
            >
              {title}
            </Typography>
          )}
          <CloseIcon className={styles.closeIcon} onClick={onClose} />
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
