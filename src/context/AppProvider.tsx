import store from '@/lib/redux/store'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

interface PropTypes {
  children: ReactNode
}

const AppProvider = ({ children }: PropTypes) => {
  return (
    <Provider store={store}>
      <ToastContainer />
      {children}
    </Provider>
  )
}

export default AppProvider
