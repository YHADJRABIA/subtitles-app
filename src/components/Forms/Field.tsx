import React, { InputHTMLAttributes, ReactNode } from 'react'
import { MdErrorOutline as ErrorIcon } from 'react-icons/md'
import cn from 'classnames'
import styles from './Field.module.scss'
import { useDebounce } from '@/hooks/useDebounce'
import { useFieldFocus } from '@/hooks/useFieldFocus'

interface PropTypes extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  value: string
  subLabel: {
    text: string
    isShownOnFocus?: boolean
    onShow?: (value: string) => boolean
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
  // TODO: Refactor this + useFieldFocus hook
  const { text, isShownOnFocus = true, onShow } = subLabel

  const debouncedValue = useDebounce(value)

  const { isFocused, isBlurred, onFocus, onBlur } = useFieldFocus({
    value: isShownOnFocus ? '' : debouncedValue,
  })

  const shouldShowSubfield = onShow && onShow(debouncedValue)

  // Info subfield shows on focus, error subfield shows on blur
  const isShownSubfield = isShownOnFocus
    ? isFocused && shouldShowSubfield
    : isBlurred && shouldShowSubfield

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

      {text && (
        <div className={styles.subField} aria-hidden={!isShownSubfield}>
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
