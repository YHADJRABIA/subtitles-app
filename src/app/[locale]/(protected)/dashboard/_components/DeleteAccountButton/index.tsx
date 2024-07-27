'use client'
import React from 'react'

import cn from 'classnames'
import styles from './DeleteAccountButton.module.scss'
import Typography from '@/components/UI/Typography'
import { Button } from '@/components/UI/Button'
import { useSession } from 'next-auth/react'
import { handleDeleteUserById } from '@/actions/user'

interface PropTypes {
  className?: string
  label: string
}

const DeleteAccountButton = ({ className, label }: PropTypes) => {
  const { data: session, status, update } = useSession()

  const handleDelete = async () => {
    console.log(session?.user.id)
    await handleDeleteUserById('123')
    // Toast + logout + redirect
  }
  return (
    <Button
      className={cn(styles.root, className)}
      variation="primary"
      backgroundColor="var(--primary-red-color)"
      disabled={status === 'loading'}
      isLoading={status === 'loading'}
      onClick={handleDelete}
    >
      <Typography size="xs" weight="semiBold">
        {label}
      </Typography>
    </Button>
  )
}

export default DeleteAccountButton
