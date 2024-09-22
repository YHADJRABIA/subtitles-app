import { Link } from '@/lib/i18n/navigation'
import styles from './Logo.module.scss'
import React from 'react'
import Image from 'next/image'

interface PropsType {
  className?: string
  size?: number
  isInvertedColor?: boolean // TODO: make colour dynamic
}

const Logo = ({ className, size, isInvertedColor }: PropsType) => {
  return (
    <Link href="/" className={className}>
      <Image
        priority
        src="/logo.svg"
        width={size ?? 65}
        height={size ?? 65}
        alt="Logo"
        style={isInvertedColor ? { filter: 'invert(100%)' } : undefined}
        className={styles.root}
      />
    </Link>
  )
}

export default Logo
