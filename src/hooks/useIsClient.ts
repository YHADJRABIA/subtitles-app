import { useEffect, useState } from 'react'

/**
 * Used to prevent errors when code is running on server
 * Equivalent to testing if typeof window !== "undefined"
 * Returns true if called on client.
 */
export const useIsClient = (): boolean => {
  const [isClient, setClient] = useState(false)

  useEffect(() => setClient(true), [])

  return isClient
}
