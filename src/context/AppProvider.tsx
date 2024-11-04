import { ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './AuthProvider'
import { ModalProvider } from './ModalProvider'

interface PropTypes {
  children: ReactNode
}

const AppProvider = async ({ children }: PropTypes) => {
  // Provide all messages to the client side
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <AuthProvider>
        <ModalProvider>
          <ToastContainer />
          {children}
        </ModalProvider>
      </AuthProvider>
    </NextIntlClientProvider>
  )
}

export default AppProvider
