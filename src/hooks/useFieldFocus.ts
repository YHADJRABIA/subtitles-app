import { useRef, useState } from 'react'

export interface useFieldFocusProps {
  value?: string
}

/**
 * If value is provided then it needs to change when user blurs it for to be unfocused
 */

export const useFieldFocus = ({ value }: useFieldFocusProps) => {
  const transientValue = useRef('')
  const valueUnchanged = transientValue.current !== value

  const [isFocused, setIsFocused] = useState(false)
  const [isBlurred, setIsBlurred] = useState(false)

  const onFocus = () => setIsFocused(true)

  // If field has no value or has been blurred without changing the value then isBlurred = false
  const onBlur = () => {
    if (!value) return

    // Only triggers if value changed after blur
    if (valueUnchanged) {
      setIsBlurred(true)
      setIsFocused(false)
    }
  }

  return { isFocused, isBlurred, onFocus, onBlur }
}
