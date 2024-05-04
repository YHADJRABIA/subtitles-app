import { ButtonHTMLAttributes } from 'react'
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
  ...rest
}: PropTypes) => {
  const isPrimary = variation === 'primary'
  const isSecondary = variation === 'secondary'

  const isClickeable = !(isLoading || disabled)
  return (
    <button
      {...rest}
      className={cn(
        styles.btn,
        isPrimary
          ? styles.primary
          : isSecondary
            ? styles.secondary
            : styles.regular,
        { disabled: !isClickeable }
      )}
      data-testid={testId}
      disabled={!isClickeable}
    >
      {isLoading ? <Loader size={18} /> : children}
    </button>
  )
}

export default Button
