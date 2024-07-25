'use client'
import React from 'react'
import Button from '../UI/Button'
import { handleLogout } from '@/actions/auth'
import cn from 'classnames'
import styles from './LogoutButton.module.scss'
import Typography from '../UI/Typography'

interface PropTypes {
  className?: string
  label: string
}

const LogoutButton = ({ className, label }: PropTypes) => {
  return (
    <Button
      className={cn(styles.root, className)}
      variation="secondary"
      onClick={handleLogout}
    >
      <Typography size="xs" weight="semiBold">
        {label}
      </Typography>
    </Button>
  )
}

export default LogoutButton
