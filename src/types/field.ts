import { InputHTMLAttributes } from 'react'
import { ValidFieldNames } from './schemas/general'
import { UseFormRegisterReturn } from 'react-hook-form'

export interface FieldBasePropTypes<K extends ValidFieldNames>
  extends InputHTMLAttributes<HTMLInputElement> {
  register: (
    name: K,
    options?: { valueAsNumber?: boolean }
  ) => UseFormRegisterReturn
  name: K
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
