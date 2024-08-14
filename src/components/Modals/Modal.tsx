import React, { ReactNode } from 'react'
import cn from 'classnames'
import styles from './Modal.module.scss'
import Typography from '@/components/UI/Typography'
import { RiCloseLargeFill as CloseIcon } from 'react-icons/ri'
import useIsOnMobile from '@/hooks/useIsOnMobile'

interface PropTypes {
  isOpen: boolean
  onClose: () => void
  title?: string
  className?: string
  children: ReactNode
}

const Modal = ({ isOpen, onClose, title, className, children }: PropTypes) => {
  const isOnMobile = useIsOnMobile()

  if (!isOpen || !children) return null

  return (
    <div className={cn(styles.root, className)} onClick={onClose}>
      <div className={styles.container} onClick={e => e.stopPropagation()}>
        <CloseIcon size={20} className={styles.closeIcon} onClick={onClose} />

        {title && (
          <Typography
            align={isOnMobile ? 'left' : 'center'}
            tag="h2"
            weight="bold"
            size="xl"
            className={styles.title}
          >
            {title}
          </Typography>
        )}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  )
}

export default Modal
