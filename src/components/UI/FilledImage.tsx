import cn from 'classnames'
import Image, { ImageProps } from 'next/image'
import React from 'react'
import styles from './FilledImage.module.scss'

export type AspectRatio = '16/9' | '16/10' | '4/3' | '1/1'

interface PropTypes extends Omit<ImageProps, 'width' | 'height'> {
  className?: string
  hasRoundedBorder?: boolean
  aspectRatio?: AspectRatio
}

const FilledImage = ({
  className,
  hasRoundedBorder = true,
  aspectRatio = '16/9',
  ...props
}: PropTypes) => {
  return (
    <div className={cn(styles.root, className)} style={{ aspectRatio }}>
      <Image
        {...props}
        fill
        alt={props.alt}
        className={cn({ [styles.roundedBorder]: hasRoundedBorder })}
      />
    </div>
  )
}

export default FilledImage
