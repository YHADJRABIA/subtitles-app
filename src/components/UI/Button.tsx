'use client'
import { ReactNode } from 'react'
import styles from './Button.module.scss'
import cn from 'classnames'
import Loader from './Loader'

interface PropTypes {
  children: ReactNode
  testId?: string
  isDisabled?: boolean
  isLoading?: boolean
  variation: 'primary' | 'secondary' | 'regular'
}

const Button = ({
  variation,
  children,
  isDisabled,
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
      disabled={isDisabled}
    >
      {isLoading ? <Loader /> : children}
    </button>
  )
}

export default Button
