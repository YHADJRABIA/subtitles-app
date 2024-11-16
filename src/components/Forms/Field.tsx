import React from 'react'

import cn from 'classnames'
import styles from './Field.module.scss'

import Subfield from './Subfield'
import { ValidFieldNames } from '@/types/schemas/general'
import { IconType } from 'react-icons/lib'
import { FieldBasePropTypes } from '@/types/field'

interface IconProps {
  src: IconType
  title?: string
}

export type PropTypes<K extends ValidFieldNames> = FieldBasePropTypes<K> & {
  leftIcon?: IconProps
  rightIcon?: IconProps
}

function Field<K extends ValidFieldNames & string>({
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
}: PropTypes<K>) {
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
        <Subfield
          className={styles.subField}
          isError={!isInfo}
          isShown={isShownSubfield}
          label={text}
        />
      )}
    </div>
  )
}

export default Field
