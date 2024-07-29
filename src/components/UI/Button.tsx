import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.scss'
import cn from 'classnames'
import Loader from './Loader'
import Typography, { TypographyPropTypes } from './Typography'
import { UrlObject } from 'url'

interface ButtonPropTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  testId?: string
  isLoading?: boolean
  isFullWidth?: boolean
  variation?: 'primary' | 'secondary' | 'regular'
  backgroundColor?: string
}

export const Button = ({
  variation = 'regular',
  children,
  disabled,
  testId,
  isLoading,
  type = 'button',
  isFullWidth = true,
  className,
  backgroundColor,
  ...rest
}: ButtonPropTypes) => {
  const isPrimary = variation === 'primary'
  const isSecondary = variation === 'secondary'

  const isClickable = !(isLoading || disabled)
  return children ? (
    <button
      {...rest}
      type={type}
      className={cn(
        styles.root,
        isPrimary
          ? styles.primary
          : isSecondary
            ? styles.secondary
            : styles.regular,
        { disabled: !isClickable, fullWidth: isFullWidth },
        className
      )}
      data-testid={testId}
      disabled={!isClickable}
      style={{ backgroundColor: backgroundColor ?? undefined }}
    >
      {isLoading ? <Loader size={17} /> : children}
    </button>
  ) : null
}

interface LinkButtonPropTypes extends TypographyPropTypes {
  testId?: string
  href: string | (UrlObject & string)
  variation?: 'primary' | 'secondary' | 'regular'
  backgroundColor?: string
  icon?: ReactNode
}

export const LinkButton = ({
  variation = 'regular',
  testId,
  isFullWidth = true,
  className,
  href,
  backgroundColor,
  children,
  icon,
  ...rest
}: LinkButtonPropTypes) => {
  const isPrimary = variation === 'primary'
  const isSecondary = variation === 'secondary'
  return (
    <Typography
      {...rest}
      href={href}
      className={cn(
        styles.root,
        styles.shadowHover,
        isPrimary
          ? styles.primary
          : isSecondary
            ? styles.secondary
            : styles.regular,
        { fullWidth: isFullWidth },
        className
      )}
      data-testid={testId}
      style={{ backgroundColor: backgroundColor ?? undefined }}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </Typography>
  )
}
