import React, { InputHTMLAttributes, ReactNode } from 'react'

import cn from 'classnames'
import styles from './Field.module.scss'

import Subfield from './Subfield'
import { ValidFieldNames } from '@/types/schemas/auth'

interface PropTypes<T> extends InputHTMLAttributes<HTMLInputElement> {
  register: (name: ValidFieldNames, options: { valueAsNumber?: boolean }) => T
  name: ValidFieldNames
  label: string
  value?: string
  subLabel?: {
    text?: string
    isShown: boolean
    isInfo?: boolean
  }
  valueAsNumber?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  testId?: string
}

function Field<T>({
  register,
  valueAsNumber,
  label,
  subLabel,
  testId,
  type,
  placeholder,
  name,
  leftIcon,
  rightIcon,
  className,
  ...rest
}: PropTypes<T>) {
  const { text, isShown = true, isInfo = false } = subLabel || {}

  const isShownSubfield = isShown && !!text

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.formField}>
        {leftIcon && <div className={styles.fieldIcon}>{leftIcon}</div>}
        <input
          {...rest}
          placeholder={placeholder}
          type={type}
          data-testid={testId}
          {...register(name, { valueAsNumber })} // TODO: Debounce value
        />
        <label htmlFor={name}>{label}</label>
        {rightIcon && <div className={styles.ctaIcon}>{rightIcon}</div>}
      </div>

      {subLabel && (
        <Subfield label={text} isShown={isShownSubfield} hasIcon={!isInfo} />
      )}
    </div>
  )
}

export default Field
