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
      <span className={styles.iconContainer}>
        <Icon className={styles.icon} />
      </span>

      <div className={styles.textContainer}>
        <Typography size="m" tag="h3" weight="bold">
          {title}
        </Typography>

        <Typography className={styles.description} size="s" weight="semiLight">
          {description}
        </Typography>
      </div>
    </div>
  )
}

export default TextWithIcon
