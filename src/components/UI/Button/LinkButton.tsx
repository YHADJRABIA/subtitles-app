import { IconType } from 'react-icons/lib'
import Typography, { LinkType, TypographyPropTypes } from '../Typography'
import styles from './Button.module.scss'
import cn from 'classnames'

interface LinkButtonPropTypes extends TypographyPropTypes {
  testId?: string
  variation?: 'primary' | 'secondary' | 'regular'
  backgroundColor?: string
  isRounded?: boolean
  icon?: { src: IconType; size?: number; color?: string }
  link: LinkType
}

export const LinkButton = ({
  variation = 'regular',
  testId,
  isFullWidth = true,
  isRounded = false,
  className,
  link = { href: '/', openInNewTab: false },
  backgroundColor,
  children,
  icon,
  ...rest
}: LinkButtonPropTypes) => {
  const isPrimary = variation === 'primary'
  const Icon = icon?.src
  return (
    <Typography
      {...rest}
      aria-pressed={isPrimary ? 'true' : 'false'}
      className={cn(
        styles.root,
        styles.linkButton,
        styles[variation],
        styles.clickable,
        {
          [styles.rounded]: isRounded,
          fullWidth: isFullWidth,
        },
        className
      )}
      data-testid={testId}
      link={{ ...link }}
      role="button"
      style={{ backgroundColor }}
      tabIndex={0}
    >
      {Icon && (
        <span className={styles.icon}>
          <Icon color={icon.color} size={icon.size ?? 18} />
        </span>
      )}
      {children}
    </Typography>
  )
}
