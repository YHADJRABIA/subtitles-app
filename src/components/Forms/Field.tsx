import React, { InputHTMLAttributes, ReactNode, useRef, useState } from 'react'
import { MdErrorOutline as ErrorIcon } from 'react-icons/md'
import cn from 'classnames'
import styles from './Field.module.scss'
import { useDebounce } from '@/hooks/useDebounce'

interface PropTypes extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  subLabel?: {
    text: string
    type?: 'info' | 'error'
    onValidate?: (value: string) => boolean
  }
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  testId?: string
}

const Field = ({
  label,
  subLabel,
  testId,
  type,
  placeholder,
  onChange,
  name,
  leftIcon,
  rightIcon,
  value,
}: PropTypes) => {
  const transientValue = useRef('')
  const [isFocused, setIsFocused] = useState(false)
  const [isBlurred, setIsBlurred] = useState(false)

  const [isInfo, isError] = [
    subLabel?.type === 'info',
    subLabel?.type === 'error',
  ]

  const onFocus = () => {
    setIsFocused(true)
  }

  const onBlur = () => {
    if (isInfo) return setIsFocused(false)
    // Only triggers if value changed after blur
    if (transientValue.current !== value) setIsBlurred(true)
  }

  const debouncedValue = useDebounce(value) as string

  const isInvalid = subLabel?.onValidate && !subLabel.onValidate(debouncedValue)

  const isShownSubfield = isInfo
    ? isFocused && isInvalid
    : isBlurred && isInvalid

  return (
    <div className={styles.wrapper}>
      <div className={styles.formField}>
        {leftIcon && <div className={styles.fieldIcon}>{leftIcon}</div>}
        <input
          placeholder={placeholder}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          data-testid={testId}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <label htmlFor={name}>{label}</label>
        {rightIcon && <div className={styles.ctaIcon}>{rightIcon}</div>}
      </div>
      {subLabel?.text && (
        <div className={styles.subField}>
          {isError && (
            <ErrorIcon
              size={14}
              className={cn(styles.errorIcon, 'hidden', {
                visible: isShownSubfield,
              })}
            />
          )}
          <small
            className={cn('hidden', { visible: isShownSubfield })}
            style={{ color: isError ? 'var(--primary-red-color)' : undefined }}
            aria-hidden={!isShownSubfield}
          >
            {subLabel.text}
          </small>
        </div>
      )}
    </div>
  )
}

export default Field
