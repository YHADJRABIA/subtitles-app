import { useState, useRef } from 'react'
import { useEventListener } from './useEventListener'

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  const lastScrollTop = useRef(0) // UseRef to track last scroll position

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop

    if (scrollTop > lastScrollTop.current) {
      // Scrolling down
      setScrollDirection('down')
    } else if (scrollTop < lastScrollTop.current) {
      // Scrolling up
      setScrollDirection('up')
    }

    lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop // Update last scroll position
  }

  useEventListener('scroll', handleScroll)

  return scrollDirection
}
