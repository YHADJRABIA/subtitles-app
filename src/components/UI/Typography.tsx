import React, { CSSProperties, ReactNode } from 'react'
import styles from './Typography.module.scss'

type TagType = keyof typeof tagMap

interface PropTypes {
  tag?: TagType
  weight?: 'normal' | 'semiBold' | 'bold'
  align?: 'left' | 'center' | 'right'
  color?: string
  uppercase?: boolean
  customStyle?: CSSProperties
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
} as const

const Typography = ({
  tag = 'p',
  weight = 'normal',
  color = 'inherit',
  uppercase = false,
  align = 'center',
  customStyle,
  children,
}: PropTypes) => {
  const Tag = tagMap[tag]

  const isSemiBold = weight === 'semiBold'

  const PropStyles = {
    fontWeight: isSemiBold ? 500 : weight,
    textAlign: align,
    color,
    textTransform: uppercase ? 'uppercase' : undefined,
    ...customStyle,
  }

  return (
    <Tag className={styles.root} style={PropStyles as CSSProperties}>
      {children}
    </Tag>
  )
}

export default Typography
