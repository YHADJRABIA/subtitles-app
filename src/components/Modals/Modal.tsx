import React, { ReactNode } from 'react'
import cn from 'classnames'
import styles from './Modal.module.scss'
import Typography from '@/components/UI/Typography'
import { RiCloseLargeFill as CloseIcon } from 'react-icons/ri'
import { IconType } from '@/types/icon'
import { useTranslations } from 'next-intl'

interface PropTypes {
  isOpen: boolean
  isClosable?: boolean
  onClose: () => void
  title?: string
  icon?: IconType
  className?: string
  children: ReactNode
}

const DEFAULT_ICON_SIZE = 28

const Modal = ({
  isOpen,
  isClosable = true,
  onClose,
  title,
  icon,
  className,
  children,
}: PropTypes) => {
  const t = useTranslations('Modal')
  if (!isOpen || !children) return null
  if (!isClosable) onClose = () => {}

  const Icon = icon?.src

  return (
    <div className={styles.root} onClick={onClose}>
      <div className={styles.container} onClick={e => e.stopPropagation()}>
        <div
          className={cn(
            styles.header,
            { [styles.centred]: !isClosable },
            className
          )}
        >
          <div className={styles.titleWrapper}>
            {Icon && (
              <Icon color={icon.color} size={icon.size ?? DEFAULT_ICON_SIZE} />
            )}
            {title && (
              <Typography size="xl" tag="h2" weight="bold">
                {title}
              </Typography>
            )}
          </div>
          {isClosable && (
            <CloseIcon
              className={styles.closeIcon}
              title={t('close')}
              onClick={onClose}
            />
          )}
        </div>
        <div className={styles.scrollableContent}>{children}</div>
      </div>
    </div>
  )
}

export default Modal
