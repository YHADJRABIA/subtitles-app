'use client'

import React from 'react'
import { usePathname } from '@/i18n/routing'
import { Link } from '@/i18n/routing'
import styles from './index.module.scss'
import { IoChevronForward as ChevronIcon } from 'react-icons/io5'
import { useTranslations } from 'next-intl'
import { generateBreadcrumbs } from '@/utils/paths'
import Typography from '../Typography'
import cn from 'classnames'

interface PropTypes {
  className?: string
}

const Breadcrumbs = ({ className }: PropTypes) => {
  const pathname = usePathname()
  const t = useTranslations('Breadcrumbs')

  const breadcrumbs = generateBreadcrumbs(pathname, t)

  if (!breadcrumbs.length) return null

  return (
    <nav aria-label="Breadcrumb" className={cn(styles.root, className)}>
      <ol className={styles.list}>
        {breadcrumbs.map((crumb, idx) => {
          const isLast = idx === breadcrumbs.length - 1

          return (
            <li key={crumb.href} className={styles.item}>
              {!isLast ? (
                <>
                  <Link href={crumb.href} className={styles.link}>
                    {crumb.label}
                  </Link>
                  <ChevronIcon aria-hidden="true" size={14} />
                </>
              ) : (
                <Typography tag="span" size='s' aria-current="page">
                  {crumb.label}
                </Typography>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
