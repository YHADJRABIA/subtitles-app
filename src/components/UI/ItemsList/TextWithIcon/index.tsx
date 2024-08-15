import React from 'react'
import styles from './TextWithIcon.module.scss'
import cn from 'classnames'
import Typography from '../../Typography'
import { IconType } from 'react-icons/lib'

export interface TextWithIconProps {
  icon: IconType
  title: string
  description: string
  className?: string
}

const TextWithIcon = ({
  className,
  title,
  description,
  icon: Icon,
}: TextWithIconProps) => {
  return (
    <div className={cn(styles.root, className)}>
      <span className={styles.icon}>
        <Icon size={20} />
      </span>

      <div className={styles.textContainer}>
        <Typography tag="h3" size="m" weight="bold" className={styles.title}>
          {title}
        </Typography>

        <Typography size="s" weight="semiLight" className={styles.description}>
          {description}
        </Typography>
      </div>
    </div>
  )
}

export default TextWithIcon
