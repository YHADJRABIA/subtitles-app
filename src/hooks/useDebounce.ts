import { useEffect, useState } from 'react'

const DEFAULT_DEBOUNCE_DELAY = 250 // in ms

/**
 * Prevents application lag due to excessive re-renders.
 * Limits the rate at which a callback is called.
 */
export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(
      () => setDebouncedValue(value),
      delay || DEFAULT_DEBOUNCE_DELAY
    )

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
