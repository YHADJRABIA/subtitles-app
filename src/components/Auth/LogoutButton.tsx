'use client'
import React, { useState } from 'react'
import { Button } from '../UI/Button'
import { handleLogout } from '@/actions/auth'
import cn from 'classnames'
import styles from './LogoutButton.module.scss'
import Typography from '../UI/Typography'
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
      variation="secondary"
      isLoading={isLoading}
      onClick={onLogoutClick}
    >
      <Typography tag="span" size="xs" weight="semiBold">
        {label}
      </Typography>
    </Button>
  )
}

export default LogoutButton
