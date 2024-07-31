import React, { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import styles from './Typography.module.scss'
import cn from 'classnames'
import { Link } from '@/lib/i18n/navigation'
import { UrlObject } from 'url'

type TagType = keyof typeof tagMap

export type LinkType = {
  href: string | null | (UrlObject & string)
  openInNewTab?: boolean
}

type TextSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'

export interface TypographyPropTypes extends HTMLAttributes<HTMLElement> {
  tag?: TagType
  weight?: 'normal' | 'semiBold' | 'bold'
  align?: 'left' | 'center' | 'right'
  size?: TextSize
  color?: string
  uppercase?: boolean
  isFullWidth?: boolean
  link?: LinkType
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
  link = { href: null, openInNewTab: false },
  className,
  children,
  isFullWidth,
  ...props
}: TypographyPropTypes) => {
  const Tag = tagMap[tag]

  const isSemiBold = weight === 'semiBold'

  const PropStyles = {
    fontWeight: isSemiBold ? 600 : weight,
    textAlign: align,
    color,
  }

  return link?.href ? (
    <Link
      {...props}
      href={link.href}
      style={PropStyles as CSSProperties}
      className={cn(
        styles.root,
        { [styles.fullWidth]: isFullWidth, uppercase },
        size && styles[size],
        className
      )}
      // TODO: complete SEO props relative to referrer and follow
      target={link.openInNewTab ? '_blank' : undefined}
    >
      {children}
    </Link>
  ) : (
    <Tag
      {...props}
      style={PropStyles as CSSProperties}
      className={cn(
        styles.root,
        { fullWidth: isFullWidth, uppercase },
        size && styles[size],
        className
      )}
    >
      {children}
    </Tag>
  )
}

export default Typography
