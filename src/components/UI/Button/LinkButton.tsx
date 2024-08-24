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
      link={{ ...link }}
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
      style={{ backgroundColor }}
      role="button"
      tabIndex={0}
      aria-pressed={isPrimary ? 'true' : 'false'}
    >
      {Icon && (
        <span className={styles.icon}>
          <Icon size={icon.size ?? 18} color={icon.color} />
        </span>
      )}
      {children}
    </Typography>
  )
}
