import { useEffect, useState } from 'react'

import { useEventListener } from './useEventListener'

const useIsOnMobile = (): boolean => {
  const [isCompact, setIsCompact] = useState(true)

  const updateMatchQuery = () =>
    setIsCompact(matchMedia('(max-width: 425px)').matches)

  useEffect(() => updateMatchQuery(), [])
  useEventListener('resize', updateMatchQuery)

  return isCompact
}

export default useIsOnMobile
