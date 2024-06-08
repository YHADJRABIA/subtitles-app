import React from 'react'
import Button from '../UI/Button'
import { FcGoogle } from 'react-icons/fc'
import styles from './GoogleLogin.module.scss'

interface PropTypes {
  disabled: boolean
  label: string
  onClick: () => void
}

// TODO: Rename to ProviderLogin & add provider prop to scale code if more auth providers are used
const GoogleLogin = ({ label, disabled, onClick }: PropTypes) => {
  return (
    <Button
      variation="secondary"
      testId="login-with-google"
      onClick={onClick}
      disabled={disabled}
      className={styles.root}
    >
      <FcGoogle title="Google" size={22} className={styles.icon} />
      {label}
    </Button>
  )
}

export default GoogleLogin
