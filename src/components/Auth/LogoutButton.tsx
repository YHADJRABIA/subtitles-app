'use client'
import React from 'react'
import Button from '../UI/Button'
import { handleLogout } from '@/lib/auth/actions'

interface PropTypes {
  className?: string
  label: string
}

const LogoutButton = ({ className, label }: PropTypes) => {
  return (
    <Button className={className} onClick={handleLogout}>
      {label}
    </Button>
  )
}

export default LogoutButton
