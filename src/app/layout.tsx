import React, { ReactNode } from 'react'

interface PropTypes {
  children: ReactNode
}

const layout = ({ children }: PropTypes) => {
  return (
    <html suppressHydrationWarning lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}

export default layout
