import React from 'react'
import styles from './Avatar.module.scss'
import { PiUserThin as UserIcon } from 'react-icons/pi'
import cn from 'classnames'
import Image from 'next/image'

interface PropTypes {
  image?: string | null
  size?: number
  className?: string
}

const DEFAULT_SIZE = 75

const Avatar = ({ image, size, className }: PropTypes) => {
  return (
    <>
      {image ? (
        <Image
          src={image}
          alt="Avatar"
          width={size ?? DEFAULT_SIZE}
          height={size ?? DEFAULT_SIZE}
          style={{ objectFit: 'cover' }}
          className={cn(styles.root, className)}
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
