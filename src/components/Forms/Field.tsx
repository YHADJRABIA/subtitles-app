import React, { InputHTMLAttributes } from 'react'

import cn from 'classnames'
import styles from './Field.module.scss'

import Subfield from './Subfield'
import { ValidFieldNames } from '@/types/schemas/auth'
import { IconType } from 'react-icons/lib'

interface IconProps {
  src: IconType
  title?: string
}
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
  leftIcon?: IconProps
  rightIcon?: IconProps
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

  const LeftIcon = leftIcon?.src
  const RightIcon = rightIcon?.src

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.formField}>
        {LeftIcon && (
          <span className={styles.fieldIcon} title={leftIcon.title}>
            <LeftIcon />
          </span>
        )}
        <input
          {...rest}
          data-testid={testId}
          placeholder={placeholder}
          type={type}
          {...register(name, { valueAsNumber })} // TODO Debounce value
        />
        <label htmlFor={name}>{label}</label>
        {RightIcon && (
          <span className={styles.ctaIcon} title={rightIcon.title}>
            <RightIcon />
          </span>
        )}
      </div>

      {subLabel && (
        <Subfield hasIcon={!isInfo} isShown={isShownSubfield} label={text} />
      )}
    </div>
  )
}

export default Field
