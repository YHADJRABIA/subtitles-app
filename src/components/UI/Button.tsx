'use client'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.scss'
import cn from 'classnames'
import Loader from './Loader'

interface PropTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  testId?: string
  isLoading?: boolean
  variation: 'primary' | 'secondary' | 'regular'
}

const Button = ({
  variation,
  children,
  disabled,
  testId,
  isLoading,
}: PropTypes) => {
  const isPrimary = variation === 'primary'
  const isSecondary = variation === 'secondary'
  return (
    <button
      className={cn(
        styles.btn,
        isPrimary
          ? styles.primary
          : isSecondary
            ? styles.secondary
            : styles.regular
      )}
      data-testid={testId}
      disabled={disabled}
    >
      {isLoading ? <Loader /> : children}
    </button>
  )
}

export default Button
