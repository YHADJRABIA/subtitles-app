import { useEffect, useState } from 'react'

import { useEventListener } from './useEventListener'

const useIsOnTablet = (): boolean => {
  const [isOnTablet, setIsOnTablet] = useState(true)

  const updateMatchQuery = () =>
    setIsOnTablet(matchMedia('(max-width: 1023px)').matches)

  useEffect(() => updateMatchQuery(), [])
  useEventListener('resize', updateMatchQuery)

  return isOnTablet
}

export default useIsOnTablet
