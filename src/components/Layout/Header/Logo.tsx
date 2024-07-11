import { Link } from '@/lib/i18n/navigation'
import styles from './Logo.module.scss'
import React from 'react'
import Image from 'next/image'

interface PropsType {
  className?: string
}

const Logo = ({ className }: PropsType) => {
  return (
    <Link href="/" className={className}>
      <Image
        src="/logo.svg"
        width={75}
        height={75}
        alt="Logo"
        className={styles.root}
      />
    </Link>
  )
}

export default Logo
