import { RefObject, useEffect, useRef } from 'react'

/**
 * Shortcut for addEventListener and removeEventListener, calls handler function when eventName is recorded on element
 */
export const useEventListener = <T extends Event>(
  eventName: string,
  handler: (event: T) => void,
  element?: RefObject<HTMLElement> | Window | Document | HTMLElement
) => {
  // Create a ref that stores the handler
  const savedHandler = useRef<(event: T) => void>()

  useEffect(() => {
    // Define the listening target
    const targetElement: HTMLElement | Window | Document =
      element instanceof HTMLElement ||
      element instanceof Window ||
      element instanceof Document
        ? element
        : window

    if (!(targetElement && targetElement.addEventListener)) return

    // Update saved handler if necessary
    if (savedHandler.current !== handler) {
      savedHandler.current = handler
    }

    // Create event listener that calls handler function stored in ref
    const eventListener = (event: Event) => {
      if (savedHandler.current) savedHandler.current(event as T)
    }

    targetElement.addEventListener(eventName, eventListener)

    // Remove listener on unmount
    return () => {
      targetElement.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element, handler])
}
