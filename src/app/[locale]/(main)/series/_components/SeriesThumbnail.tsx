import React from 'react'
import styles from './SeriesThumbnail.module.scss'
import cn from 'classnames'
import FilledImage from '@/components/UI/FilledImage'
import Typography from '@/components/UI/Typography'

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
      <FilledImage src={src} alt={alt} />
      <span className={styles.overlay}>
        <Typography size="s" color="var(--primary-white-color)">
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