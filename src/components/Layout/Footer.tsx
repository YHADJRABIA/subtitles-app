import { PORTFOLIO_LINK } from '@/utils/general'
import { getCurrentYear } from '@/utils/date'
import { useTranslations } from 'next-intl'
import styles from './Footer.module.scss'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  const t = useTranslations('Footer')
  return (
    <footer>
      <small>
        &copy;{getCurrentYear()} –{' '}
        <Link href={PORTFOLIO_LINK} className={styles.link}>
          {`${t('first_name')} ${t('last_name')}`}
        </Link>
      </small>
    </footer>
  )
}

export default Footer
