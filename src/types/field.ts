import { InputHTMLAttributes } from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

export interface FieldBasePropTypes<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<T>
  name: Path<T>
  label?: string
  subLabel?: {
    text?: string
    isShown: boolean
    isInfo?: boolean
  }
  valueAsNumber?: boolean
  testId?: string
  className?: string
}
