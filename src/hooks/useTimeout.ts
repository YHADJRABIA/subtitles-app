import { useEffect, useRef, type DependencyList } from 'react'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

export interface PropTypes {
  callback: () => void
  deps?: DependencyList
  delay?: number | null
}

export const useTimeout = ({
  callback,
  deps = [],
  delay = 500,
}: PropTypes): void => {
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
