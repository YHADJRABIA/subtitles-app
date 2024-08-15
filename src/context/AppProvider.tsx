import { ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './AuthProvider'
import { ModalProvider } from './ModalProvider'
import { getSession } from 'next-auth/react' // Import getSession to fetch the session

interface PropTypes {
  children: ReactNode
}

const AppProvider = async ({ children }: PropTypes) => {
  const messages = await getMessages()
  const session = await getSession()

  return (
    <NextIntlClientProvider messages={messages}>
      <AuthProvider session={session!}>
        <ModalProvider>
          <ToastContainer />
          {children}
        </ModalProvider>
      </AuthProvider>
    </NextIntlClientProvider>
  )
}

export default AppProvider
