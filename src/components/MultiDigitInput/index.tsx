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
  const [digits, setDigits] = useState(Array(n).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const focusInput = (idx: number, cursorAtEnd = false) => {
    const input = inputRefs.current[idx]
    if (input) {
      input.focus()
      if (cursorAtEnd && input.value) {
        // Move cursor to end of input
        const len = input.value.length
        input.setSelectionRange(len, len)
      }
    }
  }

  const updateDigitById = (idx: number, value: string) => {
    const array = [...digits]
    array[idx] = value
    setDigits(array)
    onChange(array.join(''))
  }

  const handleInputChange = (inputValue: string, idx: number) => {
    // Handle case where user types over existing digit
    if (inputValue.length > 1) {
      // Take the last character (the new one typed)
      const newDigit = inputValue.slice(-1)
      if (!isNaN(Number(newDigit))) {
        updateDigitById(idx, newDigit)
        const isLastField = idx === n - 1
        if (!isLastField) focusInput(idx + 1)
      }
      return
    }

    updateDigitById(idx, inputValue)

    const isLastField = idx === n - 1

    if (inputValue && !isLastField) focusInput(idx + 1) // Focus next field
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, idx: number) => {
    const [isFirstField, isLastField] = [idx === 0, idx === n - 1]
    const isEmptyField = !digits[idx]

    if (e.key === 'Backspace') {
      if (!isEmptyField) {
        updateDigitById(idx, '')
      } else if (!isFirstField) {
        focusInput(idx - 1)
      }
    } else if (e.key === 'ArrowLeft' && !isFirstField) {
      e.preventDefault()
      focusInput(idx - 1, true) // Cursor at end
    } else if (e.key === 'ArrowRight' && !isLastField) {
      e.preventDefault()
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
        <div className={styles.inputContainer} key={idx}>
          <input
            autoFocus={autoFocus && idx === 0}
            className={cn(styles.input, { [styles.error]: hasError })}
            disabled={isDisabled}
            inputMode="numeric"
            maxLength={2}
            ref={el => {
              inputRefs.current[idx] = el
            }}
            type="text"
            value={digit}
            onChange={e => handleInputChange(e.target.value, idx)}
            onKeyDown={e => handleKeyDown(e, idx)}
          />
          {!digit && <div className={styles.placeholder}>{'•'}</div>}
        </div>
      ))}
    </div>
  )
}

export default MultiDigitInput
