import { useEffect, useState } from 'react'

import { useEventListener } from './useEventListener'

const useIsOnDesktop = (): boolean => {
  const [isWide, setIsWide] = useState(true)

  const updateMatchQuery = () =>
    setIsWide(matchMedia('(min-width: 1023px)').matches)

  useEffect(() => updateMatchQuery(), [])
  useEventListener('resize', updateMatchQuery)

  return isWide
}

export default useIsOnDesktop
