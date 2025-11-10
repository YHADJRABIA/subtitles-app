import React from 'react'
import styles from './SeriesThumbnail.module.scss'
import cn from 'classnames'
import FilledImage from '@/components/UI/FilledImage'
import Typography from '@/components/UI/Typography'
import { colors } from '@/utils/color'

// TODO: finish up
interface PropTypes {
  title: string
  src: string
  alt: string
  className?: string
}

const SeriesThumbnail = ({
  title,
  src,
  alt,

  className,
}: PropTypes) => {
  return (
    <div className={cn(styles.root, className)}>
      <FilledImage alt={alt} src={src} />
      <span className={styles.overlay}>
        <Typography color={colors.white.primary} size="s">
          {title}
        </Typography>

        {/*  {flag && (
          <div className={styles.flag}>
            <Image src={`/flags/${flag}.svg`} alt={flag} fill></Image>
          </div>
        )} */}
      </span>
    </div>
  )
}

export default SeriesThumbnail
