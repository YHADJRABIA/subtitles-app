'use client'

import { useState, useEffect, useCallback } from 'react'

interface PropTypes {
  seconds: number
  onComplete?: () => void
}

export const useTimer = ({ seconds, onComplete }: PropTypes) => {
  const [timeLeft, setTimeLeft] = useState(0)
  const [isActive, setIsActive] = useState(false)

  const startTimer = useCallback(() => {
    setTimeLeft(seconds)
    setIsActive(true)
  }, [seconds])

  useEffect(() => {
    if (!isActive || timeLeft <= 0) {
      if (timeLeft === 0 && isActive) {
        setIsActive(false)
        onComplete?.()
      }
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsActive(false)
          onComplete?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isActive, timeLeft, onComplete])

  return {
    timeLeft,
    isActiveTimer: isActive,
    start: startTimer,
  }
}
