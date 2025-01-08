import { ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import AuthProvider from './AuthProvider'
import { ModalProvider } from './ModalProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth.config'
import ToastProvider from './ToastProvider'

interface PropTypes {
  children: ReactNode
}

const AppProvider = async ({ children }: PropTypes) => {
  // Provide all messages to the client side
  const messages = await getMessages()

  // Ensures that session is still available on client side after page refresh
  const session = await getServerSession(authOptions)

  return (
    <NextIntlClientProvider messages={messages}>
      <AuthProvider session={session}>
        <ToastProvider>
          <ModalProvider>{children}</ModalProvider>
        </ToastProvider>
      </AuthProvider>
    </NextIntlClientProvider>
  )
}

export default AppProvider
