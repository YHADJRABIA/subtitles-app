import React from 'react'
import styles from './Avatar.module.scss'
import { PiUserThin as UserIcon } from 'react-icons/pi'
import cn from 'classnames'
import Image from 'next/image'

interface PropTypes {
  src?: string | null
  size?: number
  className?: string
}

const DEFAULT_SIZE = 75

const Avatar = ({ src, size, className }: PropTypes) => {
  return (
    <>
      {src ? (
        <Image
          src={src}
          alt="Avatar"
          width={size ?? DEFAULT_SIZE}
          height={size ?? DEFAULT_SIZE}
          style={{ objectFit: 'cover' }}
          className={cn(styles.root, className)}
          priority
        />
      ) : (
        <UserIcon
          size={26}
          color="var(--primary-black-color)"
          className={cn(styles.root, className)}
        />
      )}
    </>
  )
}

export default Avatar
