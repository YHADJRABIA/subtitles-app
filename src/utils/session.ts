import { authOptions } from '@/lib/auth/auth.config'
import { ExtendedUser } from '@/types/user'
import { getServerSession } from 'next-auth'

// Returns current user if authenticated
export const getUserSession = async (): Promise<ExtendedUser> => {
  const authUserSession = await getServerSession(authOptions)

  return authUserSession?.user as ExtendedUser
}
