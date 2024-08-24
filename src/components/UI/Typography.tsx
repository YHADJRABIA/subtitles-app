import React, {
  CSSProperties,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from 'react'
import styles from './Typography.module.scss'
import cn from 'classnames'
import { Link } from '@/lib/i18n/navigation'
import { UrlObject } from 'url'
import { fontWeights, lineHeights } from '@/utils/font'

export type TagType = keyof typeof tagMap

export type LinkType = {
  href: string | null | (UrlObject & string)
  openInNewTab?: boolean
}

type TextWeight = keyof typeof fontWeights
type LineHeight = keyof typeof lineHeights
type TextSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl'
export type TextAlign = 'left' | 'center' | 'right'

export interface TypographyPropTypes extends HTMLAttributes<HTMLElement> {
  weight?: TextWeight
  align?: TextAlign
  lineHeight?: LineHeight
  size?: TextSize
  color?: string
  uppercase?: boolean
  isFullWidth?: boolean
  link?: LinkType
  className?: string
  children: ReactNode
  onClick?: MouseEventHandler<HTMLElement>
  tag?: TagType
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
  align = 'left',
  size,
  link = { href: null, openInNewTab: false },
  className,
  children,
  isFullWidth,
  lineHeight = 'regular',
  onClick,
  ...props
}: TypographyPropTypes) => {
  const Tag = tagMap[tag]

  const PropStyles = {
    fontWeight: fontWeights[weight] || weight,
    lineHeight: lineHeights[lineHeight] || lineHeight,
    textAlign: align,
    color,
  }

  const handleClick: MouseEventHandler<HTMLElement> = event => {
    if (onClick) onClick(event)
  }

  return link?.href ? (
    <Link
      {...props}
      href={link.href}
      style={PropStyles as CSSProperties}
      className={cn(
        styles.root,
        { isFullWidth, uppercase },
        size && styles[size],
        className
      )}
      target={link.openInNewTab ? '_blank' : undefined}
      rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
    >
      {children}
    </Link>
  ) : (
    <Tag
      {...props}
      style={PropStyles as CSSProperties}
      className={cn(
        styles.root,
        { isFullWidth, uppercase },
        size && styles[size],
        className
      )}
      onClick={handleClick}
    >
      {children}
    </Tag>
  )
}

export default Typography
