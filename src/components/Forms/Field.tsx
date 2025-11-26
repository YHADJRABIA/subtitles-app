import React from 'react'

import cn from 'classnames'
import styles from './Field.module.scss'

import Subfield from './Subfield'
import { IconType } from 'react-icons/lib'
import { FieldBasePropTypes } from '@/types/field'
import type { FieldValues } from 'react-hook-form'

interface IconProps {
  src: IconType
  title?: string
}

export type PropTypes<TFieldValues extends FieldValues> =
  FieldBasePropTypes<TFieldValues> & {
    leftIcon?: IconProps
    rightIcon?: IconProps
  }

function Field<TFieldValues extends FieldValues>({
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
}: PropTypes<TFieldValues>) {
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

        {subLabel && (
          <Subfield
            className={styles.subField}
            isError={!isInfo}
            isShown={isShownSubfield}
            label={text}
          />
        )}
      </div>
    </div>
  )
}

export default Field
