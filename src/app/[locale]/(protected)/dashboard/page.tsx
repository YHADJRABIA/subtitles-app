'use client'

import Button from '@/components/UI/Button'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

const DashboardPage = () => {
  const { data: session, status } = useSession()

  return (
    <div>
      <p>{JSON.stringify(session?.user)}</p>
      <Button onClick={() => signOut()}>Sign out</Button>
    </div>
  )
}

export default DashboardPage
