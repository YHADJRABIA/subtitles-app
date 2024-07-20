import { authOptions } from '@/lib/auth/auth.config'
import { getServerSession } from 'next-auth'

// Returns current user if authenticated
export const getUserSession = async () => {
  const authUserSession = await getServerSession(authOptions)

  return authUserSession?.user
}
