import { User, getServerSession } from 'next-auth'

// TODO: type any
export const session = async ({ session, token }: any) => {
  session.user.id = token.id
  session.user.tenant = token.tenant
  return session
}

// Returns current user if authenticated
export const getUserSession = async (): Promise<User> => {
  const authUserSession = await getServerSession({
    callbacks: {
      session,
    },
  })

  return authUserSession?.user
}
