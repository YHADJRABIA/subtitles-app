'use client'
import React, { useTransition } from 'react'
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
  const [isPending, startTransition] = useTransition()

  const onLogoutClick = () => {
    startTransition(async () => {
      try {
        await handleLogout()
      } catch (err) {
        console.error('Error using logout button:', getErrorMessage(err))
      }
    })
  }

  return (
    <Button
      className={cn(styles.root, className)}
      disabled={isPending}
      isLoading={isPending}
      size="xs"
      tag="span"
      variation="secondary"
      weight="semiBold"
      onClick={onLogoutClick}
    >
      {label}
    </Button>
  )
}

export default LogoutButton
