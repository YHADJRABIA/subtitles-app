import { RefObject } from 'react'

import { useEventListener } from './useEventListener'

type Handler = (event: MouseEvent) => void

/**
 * Calls handler function whenever user clicks outside of the referenced HTML element (ref)
 */
export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
): void => {
  useEventListener<MouseEvent>(mouseEvent, event => {
    const el = ref?.current

    // Do nothing if referenced element or its children are clicked
    if (!el || el.contains(event.target as Node)) return

    handler(event)
  })
}
