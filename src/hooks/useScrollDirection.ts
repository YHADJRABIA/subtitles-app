import { useState, useRef } from 'react'
import { useEventListener } from './useEventListener'
import { isClient } from '@/utils/general'
import { useDebounce } from './useDebounce'

/**
 * Returns user's scroll direction. "up" or "down"
 */
export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  const lastScrollTop = useRef(0) // UseRef to track last scroll position

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.body.scrollTop

    if (scrollTop > lastScrollTop.current) {
      // Scrolling down
      setScrollDirection('down')
    } else if (scrollTop < lastScrollTop.current) {
      // Scrolling up
      setScrollDirection('up')
    }

    lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop // Update last scroll position
  }

  const debouncedHandleScroll = useDebounce(handleScroll)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  if (isClient) useEventListener('scroll', debouncedHandleScroll, document.body)

  return scrollDirection
}
