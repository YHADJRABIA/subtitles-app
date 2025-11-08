import React from 'react'
import { Link } from '@/i18n/routing'
import styles from './index.module.scss'
import { IoChevronForward as ChevronIcon } from 'react-icons/io5'
import Typography from '../Typography'
import cn from 'classnames'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface PropTypes {
  className?: string
  items: BreadcrumbItem[]
}

const Breadcrumbs = ({ className, items }: PropTypes) => {
  if (!items.length) return null

  return (
    <nav aria-label="Breadcrumb" className={cn(styles.root, className)}>
      <ol className={styles.list}>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1
          const key = item.href ?? `${item.label}-${idx}`

          return (
            <li className={styles.item} key={key}>
              {item.href && !isLast ? (
                <Link className={styles.link} href={item.href}>
                  {item.label}
                </Link>
              ) : (
                <Typography
                  aria-current={isLast ? 'page' : undefined}
                  size="s"
                  tag="span"
                >
                  {item.label}
                </Typography>
              )}
              {!isLast && <ChevronIcon aria-hidden="true" size={14} />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
