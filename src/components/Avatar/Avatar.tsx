import React from 'react'
import styles from './Avatar.module.scss'
import cn from 'classnames'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface PropTypes {
  src?: string | null
  size?: number
  className?: string
}

const PLACEHOLDER = '/avatar/default-avatar.svg'

const Avatar = ({ src, size, className }: PropTypes) => {
  const t = useTranslations('Avatar')
  const hasAvatar = !!src
  const defaultSize = hasAvatar ? 75 : 65
  return (
    <Image
      src={hasAvatar ? src : PLACEHOLDER}
      alt={t('avatar')}
      title={t('avatar')}
      width={size ?? defaultSize}
      height={size ?? defaultSize}
      style={{ objectFit: 'cover' }}
      className={cn(styles.root, className)}
      priority
    />
  )
}

export default Avatar
