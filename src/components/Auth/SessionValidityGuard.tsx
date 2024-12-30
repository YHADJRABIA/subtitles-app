'use client'

import { DEFAULT_LOGIN_REDIRECT_ROUTE } from '@/routes/routes'
import { signOut, useSession } from 'next-auth/react'
import { ReactNode, useEffect } from 'react'

interface PropTypes {
  children: ReactNode
}

// Used to check if the user is still valid
export default function SessionValidityGuard({ children }: PropTypes) {
  const { data: clientSession } = useSession()

  const noUser = clientSession?.user.error === 'user-not-found'

  useEffect(() => {
    if (noUser) signOut({ callbackUrl: DEFAULT_LOGIN_REDIRECT_ROUTE })
  }, [noUser])

  return children
}
