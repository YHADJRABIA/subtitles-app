'use client'
import React, { useState } from 'react'
import { Button } from '../UI/Button'
import { handleLogout } from '@/actions/auth'
import cn from 'classnames'
import styles from './LogoutButton.module.scss'
import { getErrorMessage } from '@/utils/errors'

interface PropTypes {
  className?: string
  label: string
}

const LogoutButton = ({ className, label }: PropTypes) => {
  const [isLoading, setIsLoading] = useState(false)

  const onLogoutClick = async () => {
    setIsLoading(true)
    try {
      await handleLogout()
    } catch (err) {
      console.error(getErrorMessage(err))
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Button
      className={cn(styles.root, className)}
      disabled={isLoading}
      isLoading={isLoading}
      variation="secondary"
      tag="span"
      size="xs"
      weight="semiBold"
      onClick={onLogoutClick}
    >
      {label}
    </Button>
  )
}

export default LogoutButton
