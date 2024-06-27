import React from 'react'
import { getTranslations } from 'next-intl/server'
import LogoutButton from '@/components/Auth/LogoutButton'
import { authOptions } from '@/lib/auth/auth.config'
import { getServerSession } from 'next-auth'

const DashboardPage = async () => {
  const session = await getServerSession(authOptions)

  const t = await getTranslations({ namespace: 'Auth' })

  return (
    <div>
      <p>{JSON.stringify(session?.user)}</p>
      <LogoutButton label={t('log_out')} />
    </div>
  )
}

export default DashboardPage
