'use client'
import { ButtonHTMLAttributes, MouseEvent } from 'react'
import styles from './Button.module.scss'
import cn from 'classnames'
import Loader from '../Loader'
import Typography, { TypographyPropTypes } from '../Typography'

interface ButtonPropTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  testId?: string
  isLoading?: boolean
  isFullWidth?: boolean
  isRounded?: boolean
  variation?: 'primary' | 'secondary' | 'regular'
  backgroundColor?: string
  disabled?: boolean
  type?: 'submit' | 'reset' | 'button'
}

export const Button = ({
  variation = 'regular',
  tag,
  children,
  disabled,
  testId,
  isLoading,
  type = 'button',
  isFullWidth = true,
  isRounded = false,
  className,
  backgroundColor,
  onClick,
  ...rest
}: ButtonPropTypes & TypographyPropTypes) => {
  const isClickable = !(isLoading || disabled)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (onClick && isClickable) {
      onClick(event)
    }
    if (isClickable) {
      const form = event.currentTarget.closest('form')
      if (form) {
        if (type === 'submit') {
          form.requestSubmit() // Triggers form submission
        } else if (type === 'reset') {
          form.reset() // Resets form
        }
      }
    }
  }
  return children ? (
    <Typography
      {...rest}
      tag={tag}
      className={cn(
        styles.root,
        isClickable ? styles.clickable : styles.disabled,
        styles[variation],
        {
          [styles.rounded]: isRounded,
          fullWidth: isFullWidth,
        },
        className
      )}
      data-testid={testId}
      tabIndex={isClickable ? 0 : -1} // Prevents focus if disabled
      backgroundColor={backgroundColor}
      role="button"
      aria-disabled={!isClickable}
      onClick={handleClick}
    >
      {isLoading ? <Loader className={styles.loader} /> : children}
    </Typography>
  ) : null
}
