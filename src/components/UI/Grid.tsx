import React, { forwardRef, HTMLProps } from 'react'
import cn from 'classnames'

import styles from './Grid.module.scss'
import { responsiveCN, ResponsiveValues } from '@/utils/responsiveCN'

type Tag = 'div' | 'section' | 'header' | 'footer' | 'aside'
export type ColumnCount = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
export type AlignOptions = 'initial' | 'top' | 'middle' | 'bottom'
export type JustifyOptions =
  | 'initial'
  | 'start'
  | 'center'
  | 'end'
  | 'around'
  | 'between'

export interface RowProps extends HTMLProps<HTMLDivElement> {
  reverse?: ResponsiveValues<boolean>
  align?: ResponsiveValues<AlignOptions>
  justify?: ResponsiveValues<JustifyOptions>
  Tag?: Tag
}

const getResponsiveCN = responsiveCN(styles)

export const Row = forwardRef<HTMLDivElement, RowProps>(function Row(
  { className, reverse, align, justify, Tag = 'div', ...props },
  ref
) {
  return (
    <Tag
      {...props}
      ref={ref}
      className={cn(
        className,
        styles.row,
        getResponsiveCN('reverse', reverse),
        getResponsiveCN('align', align),
        getResponsiveCN('justify', justify)
      )}
    />
  )
})

export interface ColProps extends Omit<HTMLProps<HTMLDivElement>, 'width'> {
  width?: ResponsiveValues<ColumnCount>
  offset?: ResponsiveValues<ColumnCount>
  first?: boolean
  last?: boolean
  Tag?: Tag
}

export const Col = forwardRef<HTMLDivElement, ColProps>(function Col(
  { className, width, offset, first, last, Tag = 'div', ...props },
  ref
) {
  return (
    <Tag
      {...props}
      ref={ref}
      className={cn(
        className,
        getResponsiveCN('col', width),
        getResponsiveCN('offset', offset),
        {
          [styles.first]: first,
          [styles.last]: last,
        }
      )}
    />
  )
})
