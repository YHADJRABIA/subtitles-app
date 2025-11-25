'use client'

import {
  ChangeEvent,
  useRef,
  useState,
  useCallback,
  memo,
  ReactNode,
} from 'react'
import styles from './Searchbar.module.scss'
import {
  PiMagnifyingGlassThin as SearchIcon,
  PiXCircleFill as ClearIcon,
} from 'react-icons/pi'
import cn from 'classnames'
import Loader from '@/components/UI/Loader'
import { useTranslations } from 'next-intl'
import Typography from '../UI/Typography'
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation'

interface PropTypes<T = string> {
  value?: string
  placeholder?: string
  onChange: (value: string) => void

  /** Autocomplete */
  items?: T[]
  loading?: boolean
  onSelect?: (item: T) => void
  renderItem?: (item: T, onSelect: () => void) => ReactNode

  isFoldable?: boolean
  className?: string
}

const Searchbar = <T,>({
  value,
  placeholder,
  onChange,
  items,
  loading = false,
  onSelect,
  renderItem,
  isFoldable = false,
  className,
}: PropTypes<T>) => {
  const t = useTranslations('Searchbar')
  const [focused, setFocused] = useState(false)
  const [isExpanded, setIsExpanded] = useState(!isFoldable)
  const inputRef = useRef<HTMLInputElement>(null)

  const [internalValue, setInternalValue] = useState(value ?? '')
  const isControlled = value !== undefined
  const inputValue = isControlled ? (value as string) : internalValue

  const placeholderText = placeholder ?? t('placeholder')

  const hasItems = !!items?.length
  const hasInput = !!inputValue.length
  const shouldShowEmpty = hasInput && !loading && !hasItems

  const showDropdown = focused && (loading || hasItems || shouldShowEmpty)

  const handleSelect = useCallback(
    (item: T) => {
      onSelect?.(item)
      if (!renderItem) {
        const stringValue = String(item)

        if (!isControlled) setInternalValue(stringValue)

        onChange(stringValue)
      }
    },
    [onSelect, renderItem, isControlled, onChange]
  )

  const { activeIndex, setActiveIndex, itemsRefs, handleKeyDown } =
    useKeyboardNavigation({
      items,
      isOpen: showDropdown,
      onSelect: handleSelect,
      onClose: () => {
        setFocused(false)
        inputRef.current?.blur()
      },
    })

  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      onChange(newValue)
    },
    [onChange]
  )

  const handleClear = useCallback(() => {
    if (!isControlled) {
      setInternalValue('')
    }

    onChange('')
    inputRef.current?.focus()
  }, [isControlled, onChange])

  const handleIconClick = useCallback(() => {
    if (isFoldable && !isExpanded) {
      setIsExpanded(true)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isFoldable, isExpanded])

  const handleFocus = useCallback(() => setFocused(true), [])

  const handleBlur = useCallback(() => {
    setFocused(false)

    if (isFoldable && !inputValue.length) setIsExpanded(false)
  }, [isFoldable, inputValue])

  const showPointer = isFoldable && !isExpanded

  const renderSuggestion = (item: T, idx: number) => {
    const handleItemSelect = () => handleSelect(item)
    const isActive = idx === activeIndex

    if (renderItem) {
      return (
        <div
          className={cn(styles.dropdownItem, {
            [styles.dropdownItemActive]: isActive,
          })}
          key={idx}
          ref={el => {
            itemsRefs.current[idx] = el
          }}
          onMouseDown={handleItemSelect}
          onMouseEnter={() => setActiveIndex(idx)}
        >
          {renderItem(item, handleItemSelect)}
        </div>
      )
    }

    const label = String(item)

    return (
      <div
        className={cn(styles.dropdownItem, {
          [styles.dropdownItemActive]: isActive,
        })}
        key={idx}
        ref={el => {
          itemsRefs.current[idx] = el
        }}
        onMouseDown={handleItemSelect}
        onMouseEnter={() => setActiveIndex(idx)}
      >
        {label}
      </div>
    )
  }

  return (
    <div
      className={cn(styles.root, className, {
        [styles.foldable]: isFoldable,
        [styles.expanded]: isExpanded,
        [styles.collapsed]: !isExpanded,
      })}
    >
      <SearchIcon
        className={styles.iconLeft}
        size={24}
        style={{ cursor: showPointer ? 'pointer' : 'default' }}
        onClick={handleIconClick}
      />

      <input
        className={styles.input}
        placeholder={placeholderText}
        ref={inputRef}
        value={inputValue}
        onBlur={handleBlur}
        onChange={handleInput}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
      />

      {inputValue && (
        <ClearIcon
          className={styles.clearButton}
          size={18}
          onClick={handleClear}
        />
      )}

      {showDropdown && (
        <div className={styles.dropdown}>
          {hasItems ? (
            <>
              {items?.map(renderSuggestion)}
              {loading && (
                <div className={styles.container}>
                  <Loader size={16} />
                </div>
              )}
            </>
          ) : loading ? (
            <div className={styles.container}>
              <Loader size={20} />
            </div>
          ) : (
            shouldShowEmpty && (
              <Typography className={styles.container} size="xs">
                {t('no_results')}
              </Typography>
            )
          )}
        </div>
      )}
    </div>
  )
}

export default memo(Searchbar) as typeof Searchbar
