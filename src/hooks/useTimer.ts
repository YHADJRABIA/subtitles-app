import { useState, useEffect, useCallback } from 'react'

interface PropTypes {
  initialTime: number // seconds
}

const useTimer = (initialTime: PropTypes) => {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return
    if (timeLeft <= 0) {
      setIsRunning(false)
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => Math.max(prevTime - 1, 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [isRunning, timeLeft])

  const start = useCallback(() => {
    setIsRunning(true)
  }, [])

  const pause = useCallback(() => {
    setIsRunning(false)
  }, [])

  const reset = useCallback(() => {
    setIsRunning(false)
    setTimeLeft(initialTime)
  }, [initialTime])

  return { timeLeft, isRunning, start, pause, reset }
}

export default useTimer
