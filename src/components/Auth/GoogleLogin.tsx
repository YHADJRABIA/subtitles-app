import React, { useState } from 'react'
import { Button } from '../UI/Button'
import { FcGoogle } from 'react-icons/fc'
import styles from './GoogleLogin.module.scss'
import { getErrorMessage } from '@/utils/errors'
import { SignInResponse } from 'next-auth/react'

interface PropTypes {
  disabled: boolean
  label: string
  onClick: () => Promise<SignInResponse | undefined>
}

// TODO: Rename to ProviderLogin & add provider prop to scale code if more auth providers are used
const GoogleLogin = ({ label, disabled, onClick }: PropTypes) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    try {
      await onClick()
    } catch (err) {
      console.error(getErrorMessage(err))
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Button
      className={styles.root}
      variation="secondary"
      weight="semiBold"
      size="xs"
      testId="login-with-google"
      onClick={handleClick}
      disabled={disabled || isLoading}
      isLoading={isLoading}
      title={label}
    >
      <FcGoogle title="Google" size={22} />
      {label}
    </Button>
  )
}

export default GoogleLogin
