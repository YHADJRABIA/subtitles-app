import { useSession } from 'next-auth/react'

/**
 * Returns session's user.
 */
export const useCurrentUser = () => {
  const session = useSession()
  const user = session.data

  return user
}
