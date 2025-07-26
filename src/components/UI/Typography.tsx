import React, { HTMLAttributes, MouseEventHandler, ReactNode } from 'react'
import styles from './Typography.module.scss'
import cn from 'classnames'
import { Link } from '@/i18n/routing'
import { UrlObject } from 'url'
import { fontWeights, lineHeights } from '@/utils/font'

export type TagType = keyof typeof tagMap

export type LinkType = {
  href: string | null | (UrlObject & string)
  openInNewTab?: boolean
}

type TextWeight = keyof typeof fontWeights
type LineHeight = keyof typeof lineHeights
export type TextSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl'
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
  backgroundColor?: string
  testId?: string
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
  backgroundColor,
  testId,
  ...props
}: TypographyPropTypes) => {
  const Tag = tagMap[tag]

  const PropStyles = {
    fontWeight: fontWeights[weight] || weight,
    lineHeight: lineHeights[lineHeight] || lineHeight,
    textAlign: align,
    color,
    backgroundColor,
  }

  const handleClick: MouseEventHandler<HTMLElement> = event => {
    if (onClick) onClick(event)
  }

  const commonProps = {
    className: cn(
      styles.root,
      { isFullWidth, uppercase },
      size && styles[size],
      className
    ),
    'data-testid': testId,
    style: PropStyles,
  }

  return link?.href ? (
    <Link
      href={link.href}
      rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
      target={link.openInNewTab ? '_blank' : undefined}
      {...commonProps}
    >
      {children}
    </Link>
  ) : (
    <Tag
      {...props}
      {...commonProps}
      onClick={onClick ? handleClick : undefined} // Allows component to remain server component if no onClick is passed
    >
      {children}
    </Tag>
  )
}

export default Typography
