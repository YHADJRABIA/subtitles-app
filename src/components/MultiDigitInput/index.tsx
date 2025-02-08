import React, { KeyboardEvent, useRef } from 'react'
import styles from './MultiDigitInput.module.scss'
import cn from 'classnames'

interface MultiDigitInputProps {
  n: number
  value: string
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
  value,
  onChange,
  isDisabled = false,
  autoFocus = true,
  hasError = false,
  className,
  ariaLabel,
  testId,
}: MultiDigitInputProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const focusInput = (idx: number) => inputRefs.current[idx]?.focus()

  // Update specific input field
  const handleInputChange = (inputValue: string, idx: number) => {
    // Allow only single-character inputs
    if (inputValue.length > 1) return

    // Create a multi-digit array
    const otpArray = value.split('')
    otpArray[idx] = inputValue // Update current index digit
    const newValue = otpArray.join('') // Rebuild string

    onChange(newValue) // Update parent value

    const isLastField = idx === n - 1
    if (!isLastField) focusInput(idx + 1) // Focus next field
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, idx: number) => {
    const [isFirstField, isLastField] = [idx === 0, idx === n - 1]
    const isEmptyField = !value[idx]

    if (e.key === 'Backspace' && !isFirstField && isEmptyField) {
      focusInput(idx - 1) // Move focus to previous field on backspace
    } else if (e.key === 'ArrowLeft' && !isFirstField) {
      focusInput(idx - 1) // Move focus to previous field on left arrow
    } else if (e.key === 'ArrowRight' && !isLastField) {
      if (value[idx]) {
        focusInput(idx + 1) // Move focus to next field if current field is filled
      } else {
        e.preventDefault() // Prevent navigation if the current field is empty
      }
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
      {Array.from({ length: n }).map((_, idx) => (
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
          value={value[idx]} // Render correct digit
          onChange={e => handleInputChange(e.target.value, idx)}
          onKeyDown={e => handleKeyDown(e, idx)}
        />
      ))}
    </div>
  )
}

export default MultiDigitInput
