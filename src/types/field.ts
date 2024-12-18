import { InputHTMLAttributes } from 'react'
import { ValidFieldNames } from './schemas/general'
import { FieldValues, UseFormRegister } from 'react-hook-form'

export interface FieldBasePropTypes<K extends ValidFieldNames>
  extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<FieldValues | any> // TODO: Fix regression caused by React-hook-form update (should be UseFormRegister<FieldValues>)
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
