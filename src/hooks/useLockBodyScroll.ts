import { useEffect, useState } from 'react'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

type ReturnType = [boolean, (locked: boolean) => void]

/**
 * Prevents scroll
 */
function useLockBodyScroll(initialLocked = false): ReturnType {
  const [locked, setLocked] = useState(initialLocked)

  // Do the side effect before render
  useIsomorphicLayoutEffect(() => {
    if (!locked) return

    const root = document.body
    // Save initial body style
    const originalOverflow = root.style.overflow
    const originalPaddingRight = root.style.paddingRight

    // Lock body scroll
    root.style.overflow = 'hidden'

    // Get the scrollBar width

    const scrollBarWidth = root ? root.offsetWidth - root.scrollWidth : 0

    // Avoid width reflow
    if (scrollBarWidth) {
      root.style.paddingRight = `${scrollBarWidth}px`
    }

    return () => {
      root.style.overflow = originalOverflow

      if (scrollBarWidth) {
        root.style.paddingRight = originalPaddingRight
      }
    }
  }, [locked])

  // Update state if initialValue changes
  useEffect(() => {
    if (locked !== initialLocked) {
      setLocked(initialLocked)
    }
  }, [initialLocked, locked])

  return [locked, setLocked]
}

export default useLockBodyScroll
