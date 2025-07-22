import React, { ReactNode } from 'react'

interface PropTypes {
  children: ReactNode
}

const layout = ({ children }: PropTypes) => {
  return <>{children}</>
}

export default layout
