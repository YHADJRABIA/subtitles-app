import { useEffect, useRef, type DependencyList } from 'react'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

export const useTimeout = (
  callback: () => void,
  delay: number | null,
  deps: DependencyList = []
): void => {
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes
  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === null) return // Exit if delay is null

    const id = setTimeout(() => savedCallback.current(), delay)

    return () => clearTimeout(id) // Clean up timeout on unmount or delay change
  }, [delay, deps])
}
