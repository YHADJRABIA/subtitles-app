import { KeyboardEvent, RefObject, useEffect, useRef, useState } from 'react'

interface PropTypes<T> {
  items: T[] | undefined
  isOpen: boolean
  onSelect: (item: T) => void
  onClose: () => void
}

interface UseKeyboardNavigationReturn {
  activeIndex: number | null
  setActiveIndex: (index: number | null) => void
  itemsRefs: RefObject<Array<HTMLDivElement | null>>
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void
}

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value))

export const useKeyboardNavigation = <T>({
  items,
  isOpen,
  onSelect,
  onClose,
}: PropTypes<T>): UseKeyboardNavigationReturn => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const itemsRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    if (!isOpen || !items?.length) {
      setActiveIndex(null)
      itemsRefs.current = []
    } else {
      setActiveIndex(0)
    }
  }, [isOpen, items])

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const { key } = event

    if (key === 'Escape' && isOpen) {
      event.preventDefault()
      onClose()
      return
    }

    if (!isOpen || !items?.length) return

    const handlers: Record<string, () => void> = {
      ArrowDown: () => {
        event.preventDefault()
        setActiveIndex(prev =>
          prev === null ? 0 : clamp(prev + 1, 0, items.length - 1)
        )
      },
      ArrowUp: () => {
        event.preventDefault()
        setActiveIndex(prev =>
          prev === null ? 0 : clamp(prev - 1, 0, items.length - 1)
        )
      },
      Enter: () => {
        if (activeIndex === null) return

        const activeItem = items[activeIndex]
        if (!activeItem) return

        event.preventDefault()

        const container = itemsRefs.current[activeIndex]
        const clickable = container?.querySelector<HTMLElement>(
          'a, button, [data-search-selectable="true"]'
        )

        if (clickable) {
          clickable.click()
        } else {
          onSelect(activeItem)
        }

        onClose()
      },
    }

    handlers[key]?.()
  }

  return {
    activeIndex,
    setActiveIndex,
    itemsRefs,
    handleKeyDown,
  }
}
