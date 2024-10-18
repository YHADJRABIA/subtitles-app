import { useRef, useEffect } from 'react'

const DEFAULT_DEBOUNCE_DELAY = 250 // in ms

/**
 * Prevents application lag due to excessive re-renders.
 * Limits the rate at which a callback is called.
 */
export const useDebounce = (callback: () => void, delay?: number) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const debouncedCallback = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      callback()
    }, delay || DEFAULT_DEBOUNCE_DELAY)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return debouncedCallback
}
