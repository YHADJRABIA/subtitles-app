import { authOptions } from '@/lib/auth/auth.config'
import { getServerSession, User } from 'next-auth'

// Returns current user if authenticated
export const getUserSession = async (): Promise<User> => {
  const authUserSession = await getServerSession(authOptions)

  return authUserSession?.user as User
}
