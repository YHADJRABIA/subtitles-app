import React, { InputHTMLAttributes, ReactNode } from 'react'
import { MdErrorOutline as ErrorIcon } from 'react-icons/md'
import cn from 'classnames'
import styles from './Field.module.scss'
import { useDebounce } from '@/hooks/useDebounce'
import { useFieldFocus } from '@/hooks/useFieldFocus'
import { isEmpty } from '@/utils/validators'

interface PropTypes extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  value: string
  onValidate?: (value: string) => boolean
  subLabel?: {
    text: string
    isShownOnFocus?: boolean
  }
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  testId?: string
}

const Field = ({
  label,
  onValidate,
  subLabel,
  testId,
  type,
  placeholder,
  onChange,
  name,
  leftIcon,
  rightIcon,
  value,
  className,
  ...rest
}: PropTypes) => {
  // TODO: Refactor this + useFieldFocus hook
  const { text, isShownOnFocus = true } = subLabel || {}

  const debouncedValue = useDebounce(value)

  const { isFocused, isBlurred, onFocus, onBlur } = useFieldFocus({
    value: isShownOnFocus ? '' : debouncedValue,
  })

  const isInvalid = onValidate
    ? !onValidate(debouncedValue)
    : !isEmpty(debouncedValue)

  // Info subfield shows on focus, error subfield shows on blur
  const isShownSubfield = isShownOnFocus
    ? isFocused && isInvalid
    : isBlurred && isInvalid

  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={styles.formField}>
        {leftIcon && <div className={styles.fieldIcon}>{leftIcon}</div>}
        <input
          {...rest}
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

      {subLabel && (
        <div className={styles.subField}>
          {!isShownOnFocus && (
            <ErrorIcon
              size={14}
              className={cn(styles.errorIcon, 'hidden', {
                visible: isShownSubfield,
              })}
            />
          )}
          <small
            className={cn('hidden', { visible: isShownSubfield })}
            style={{
              color: isShownOnFocus ? undefined : 'var(--primary-red-color)',
            }}
          >
            {text}
          </small>
        </div>
      )}
    </div>
  )
}

export default Field
