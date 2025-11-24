import { ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import AuthProvider from './AuthProvider'
import { ModalProvider } from './ModalProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth.config'
import ToastProvider from './ToastProvider'
import SeriesProvider from './SeriesProvider'
import { Series } from '@/types/series'

interface PropTypes {
  children: ReactNode
  series: Series[]
}

const AppProvider = async ({ children, series }: PropTypes) => {
  // Provide all messages to the client side
  const messages = await getMessages()

  // Ensures that session is still available on client side after page refresh
  const session = await getServerSession(authOptions)

  return (
    <NextIntlClientProvider messages={messages}>
      <AuthProvider session={session}>
        <ToastProvider>
          <ModalProvider>
            <SeriesProvider series={series}>{children}</SeriesProvider>
          </ModalProvider>
        </ToastProvider>
      </AuthProvider>
    </NextIntlClientProvider>
  )
}

export default AppProvider
