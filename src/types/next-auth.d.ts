import { ExtendedUser, UserAPIType } from './user'

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
  }

  interface User extends UserAPIType {}
}
