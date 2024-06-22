'use client'
import Button from '@/components/UI/Button'
import React from 'react'
import { handleLogout } from '@/lib/auth/actions'
import { useSession } from 'next-auth/react'

const DashboardPage = () => {
  const session = useSession()

  return (
    <div>
      <p>{JSON.stringify(session?.user)}</p>
      <Button onClick={handleLogout}>Sign out</Button>
    </div>
  )
}

export default DashboardPage
