import Link from '@/components/Link'
import styles from './Logo.module.scss'
import React from 'react'
import Image from 'next/image'

const Logo = () => {
  return (
    <Link href="/">
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
