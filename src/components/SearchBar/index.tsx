'use client'

import { ChangeEvent, useEffect, useRef, useState } from 'react'
import styles from './Searchbar.module.scss'
import {
  PiMagnifyingGlassThin as SearchIcon,
  PiXCircleFill as ClearIcon,
} from 'react-icons/pi'
import cn from 'classnames'
import Loader from '@/components/UI/Loader'

interface PropTypes<T = string> {
  value: string
  placeholder?: string
  onChange: (value: string) => void

  /** Autocomplete */
  items?: T[]
  loading?: boolean
  onSelect?: (item: T) => void
  renderItem?: (item: T, onSelect: () => void) => React.ReactNode

  isFoldable?: boolean
  className?: string
}

const Searchbar = <T,>({
  value,
  placeholder = 'Search...',
  onChange,
  items,
  loading = false,
  onSelect,
  renderItem,
  isFoldable = false,
  className,
}: PropTypes<T>) => {
  const [focused, setFocused] = useState(false)
  const [isExpanded, setIsExpanded] = useState(!isFoldable)
  const inputRef = useRef<HTMLInputElement>(null)

  const showDropdown = focused && (loading || (items && items.length > 0))

  const handleInput = (e: ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value)

  const handleClear = () => onChange('')

  const handleIconClick = () => {
    if (isFoldable && !isExpanded) {
      setIsExpanded(true)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }

  const handleBlur = () => {
    // Delay to allow click events on dropdown items to fire first
    setTimeout(() => {
      setFocused(false)
      if (isFoldable && !value) {
        setIsExpanded(false)
      }
    }, 200)
  }

  const handleSelect = (item: T) => {
    onSelect?.(item)
    onChange(String(item))
  }

  const showPointer = isFoldable && !isExpanded

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
        placeholder={placeholder}
        ref={inputRef}
        value={value}
        onBlur={handleBlur}
        onChange={handleInput}
        onFocus={() => setFocused(true)}
      />

      {value && (
        <ClearIcon
          className={styles.clearButton}
          size={18}
          onClick={handleClear}
        />
      )}

      {showDropdown && (
        <div className={styles.autocomplete}>
          {loading && (
            <div className={styles.loader}>
              <Loader size={16} />
            </div>
          )}

          {!loading &&
            items?.map((item, i) => {
              const key = typeof item === 'string' ? item : i

              if (renderItem) {
                return (
                  <div key={key}>
                    {renderItem(item, () => handleSelect(item))}
                  </div>
                )
              }

              return (
                <div className={styles.autocompleteItem} key={key}>
                  <button
                    type="button"
                    onMouseDown={e => {
                      e.preventDefault()
                      handleSelect(item)
                    }}
                  >
                    {String(item)}
                  </button>
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}

export default Searchbar
