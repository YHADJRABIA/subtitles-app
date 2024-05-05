import store from '@/lib/redux/store'

import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './AuthProvider'

interface PropTypes {
  children: ReactNode
}

const AppProvider = ({ children }: PropTypes) => {
  /*     <Provider store={store}> 
      </Provider>  */
  return (
    <AuthProvider>
      <ToastContainer />
      {children}
    </AuthProvider>
  )
}

export default AppProvider
