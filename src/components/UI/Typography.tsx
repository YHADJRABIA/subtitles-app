import React, { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import styles from './Typography.module.scss'
import cn from 'classnames'
import { Link } from '@/lib/i18n/navigation'
import { UrlObject } from 'url'

type TagType = keyof typeof tagMap

type TextSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'

interface PropTypes extends HTMLAttributes<HTMLElement> {
  tag?: TagType
  weight?: 'normal' | 'semiBold' | 'bold'
  align?: 'left' | 'center' | 'right'
  size?: TextSize
  color?: string
  uppercase?: boolean
  fullWidth?: boolean
  href?: string | (UrlObject & string)
  className?: string
  children: ReactNode
}

const tagMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  small: 'small',
  span: 'span',
} as const

const Typography = ({
  tag = 'p',
  weight = 'normal',
  color,
  uppercase = false,
  align = 'center',
  size,
  href,
  className,
  children,
  fullWidth,
  ...props
}: PropTypes) => {
  const Tag = tagMap[tag]

  const isSemiBold = weight === 'semiBold'

  const PropStyles = {
    fontWeight: isSemiBold ? 600 : weight,
    textAlign: align,
    color,
  }

  return href ? (
    <Link
      {...props}
      href={href}
      style={PropStyles as CSSProperties}
      className={cn(
        styles.root,
        { [styles.fullWidth]: fullWidth, uppercase },
        size && styles[size],
        className
      )}
    >
      {children}
    </Link>
  ) : (
    <Tag
      {...props}
      style={PropStyles as CSSProperties}
      className={cn(
        styles.root,
        { fullWidth, uppercase },
        size && styles[size],
        className
      )}
    >
      {children}
    </Tag>
  )
}

export default Typography
