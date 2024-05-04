'use client'
import store from '@/lib/redux/store'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

interface PropTypes {
  children: ReactNode
}

const AppProvider = ({ children }: PropTypes) => {
  /*     <Provider store={store}> 
      </Provider>  */
  return (
    /*     <SessionProvider> */
    <>
      <ToastContainer />
      {children}
    </>
    /*   </SessionProvider> */
  )
}

export default AppProvider
