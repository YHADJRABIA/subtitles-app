import store from '@/lib/redux/store'

import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './AuthProvider'

interface PropTypes {
  children: ReactNode
}

const AppProvider = async ({ children }: PropTypes) => {
  const messages = await getMessages()

  /*     <Provider store={store}> 
      </Provider>  */
  return (
    <NextIntlClientProvider messages={messages}>
      <AuthProvider>
        <ToastContainer />
        {children}
      </AuthProvider>
    </NextIntlClientProvider>
  )
}

export default AppProvider
