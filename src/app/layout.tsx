import React, { ReactNode } from 'react'

interface PropTypes {
  children: ReactNode
}

const layout = ({ children }: PropTypes) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}

export default layout
