import React, { InputHTMLAttributes, ReactNode } from 'react'

import cn from 'classnames'
import styles from './Field.module.scss'

import Subfield from './Subfield'
import { ValidFieldNames } from '@/types/schemas/auth'

interface PropTypes<T, K extends ValidFieldNames>
  extends InputHTMLAttributes<HTMLInputElement> {
  register: (name: K, options: { valueAsNumber?: boolean }) => T
  name: K
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

function Field<T, K extends ValidFieldNames & string>({
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
}: PropTypes<T, K>) {
  const { text, isShown = true, isInfo = false } = subLabel || {}

  const isShownSubfield = isShown && !!text

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.formField}>
        {leftIcon && <span className={styles.fieldIcon}>{leftIcon}</span>}
        <input
          {...rest}
          placeholder={placeholder}
          type={type}
          data-testid={testId}
          {...register(name, { valueAsNumber })} // Use register with the name prop
        />
        <label htmlFor={name}>{label}</label>
        {rightIcon && <span className={styles.ctaIcon}>{rightIcon}</span>}
      </div>

      {subLabel && (
        <Subfield label={text} isShown={isShownSubfield} hasIcon={!isInfo} />
      )}
    </div>
  )
}

export default Field
