import React, { CSSProperties, ReactNode } from 'react'

type TagType = keyof typeof tagMap

interface PropTypes {
  tag?: TagType
  weight?: 'normal' | 'semiBold' | 'bold'
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
} as const

const Typography = ({
  tag = 'p',
  weight = 'normal',
  color = 'inherit',
  uppercase = false,
  customStyle,
  children,
}: PropTypes) => {
  const Tag = tagMap[tag]

  const isSemiBold = weight === 'semiBold'

  const styles = {
    fontWeight: isSemiBold ? 500 : weight,
    color: color,
    textTransform: uppercase ? 'uppercase' : undefined,
    ...customStyle,
  }

  return <Tag style={styles as CSSProperties}>{children}</Tag>
}

export default Typography
