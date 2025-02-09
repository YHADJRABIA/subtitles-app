import React, { KeyboardEvent, useRef, useState } from 'react'
import styles from './MultiDigitInput.module.scss'
import cn from 'classnames'

interface MultiDigitInputProps {
  n: number
  onChange: (value: string) => void
  isDisabled?: boolean
  autoFocus?: boolean
  hasError?: boolean
  className?: string
  ariaLabel?: string
  testId?: string
}

const MultiDigitInput = ({
  n,
  onChange,
  isDisabled = false,
  autoFocus = true,
  hasError = false,
  className,
  ariaLabel,
  testId,
}: MultiDigitInputProps) => {
  const [digits, setDigits] = useState<string[]>(Array(n).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const focusInput = (idx: number) => inputRefs.current[idx]?.focus()

  const handleInputChange = (inputValue: string, idx: number) => {
    // Allow only single-character inputs
    if (inputValue.length > 1) return

    const array = [...digits]
    array[idx] = inputValue
    setDigits(array)
    onChange(array.join(''))

    const isLastField = idx === n - 1
    if (inputValue && !isLastField) focusInput(idx + 1) // Focus next field
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, idx: number) => {
    const [isFirstField, isLastField] = [idx === 0, idx === n - 1]
    const isEmptyField = !digits[idx]

    if (e.key === 'Backspace' && isEmptyField && !isFirstField) {
      focusInput(idx - 1)
    } else if (e.key === 'ArrowLeft' && !isFirstField) {
      focusInput(idx - 1)
    } else if (e.key === 'ArrowRight' && !isLastField) {
      focusInput(idx + 1)
    } else if (isNaN(Number(e.key))) {
      e.preventDefault() // Prevent non-numeric input
    }
  }

  return (
    <div
      aria-label={ariaLabel}
      className={cn(styles.root, className)}
      data-testid={testId}
    >
      {digits.map((digit, idx) => (
        <input
          autoFocus={autoFocus && idx === 0}
          className={cn(styles.input, { [styles.error]: hasError })}
          disabled={isDisabled}
          inputMode="numeric"
          key={idx}
          maxLength={1}
          ref={el => {
            inputRefs.current[idx] = el
          }}
          type="number"
          value={digit}
          onChange={e => handleInputChange(e.target.value, idx)}
          onKeyDown={e => handleKeyDown(e, idx)}
        />
      ))}
    </div>
  )
}

export default MultiDigitInput
