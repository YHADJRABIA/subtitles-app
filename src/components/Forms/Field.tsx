import React, { InputHTMLAttributes, ReactNode } from 'react'
import styles from './Field.module.scss'

interface PropTypes extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

const Field = ({
  label,
  type,
  placeholder,
  onChange,
  name,
  leftIcon,
  rightIcon,
  value,
}: PropTypes) => {
  return (
    <div className={styles.formField}>
      {leftIcon && <div className={styles.fieldIcon}>{leftIcon}</div>}
      <input
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={name}>{label}</label>
      {rightIcon && <div className={styles.ctaIcon}>{rightIcon}</div>}
    </div>
  )
}

export default Field
