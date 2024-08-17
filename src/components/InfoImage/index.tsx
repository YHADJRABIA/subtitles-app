import styles from './InfoImage.module.scss'
import cn from 'classnames'
import Typography, { TextAlign } from '../UI/Typography'
import FilledImage from '../UI/FilledImage'

/* type FlagType = 'ru' | 'kz' */

interface PropTypes {
  title: string
  titleAlign?: TextAlign
  /*   flag?: FlagType */
  src: string
  alt: string
  className?: string
}

const InfoImage = ({
  title,
  src,
  alt,
  titleAlign,
  /*   flag, */
  className,
}: PropTypes) => {
  return (
    <div className={cn(styles.root, className)}>
      <FilledImage src={src} alt={alt} />
      <span className={styles.overlay}>
        <Typography
          align={titleAlign ?? 'left'}
          size="s"
          color="var(--primary-white-color)"
        >
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

export default InfoImage