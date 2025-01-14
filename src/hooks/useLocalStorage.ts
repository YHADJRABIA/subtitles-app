'use client'

import { isClient } from '@/utils/general'
import { useState } from 'react'

type ValueType<T> = T | null

interface PropTypes<T> {
  key: string
  defaultValue?: ValueType<T>
}

export function useLocalStorage<T>({
  key,
  defaultValue = null,
}: PropTypes<T>): [ValueType<T>, (value: ValueType<T>) => void] {
  const [storedValue, setStoredValue] = useState(() => {
    if (!isClient) return defaultValue
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (err) {
      console.error('Error reading localStorage key:', key, err)
      return defaultValue
    }
  })

  const setValue = (value: ValueType<T>) => {
    try {
      if (value === null) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(value))
      }
      setStoredValue(value)
    } catch (err) {
      console.error('Error setting localStorage key:', key, err)
    }
  }

  return [storedValue, setValue]
}
