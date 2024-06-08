import React from 'react'
import Button from '../UI/Button'
import { FcGoogle } from 'react-icons/fc'
import styles from './GoogleLogin.module.scss'

interface PropTypes {
  disabled: boolean
  label: string
  onClick: () => void
}

const GoogleLogin = ({ label, disabled, onClick }: PropTypes) => {
  return (
    <Button
      variation="secondary"
      testId="login-with-google"
      onClick={onClick}
      disabled={disabled}
    >
      <FcGoogle title="Google" size={22} className={styles.googleIcon} />
      {label}
    </Button>
  )
}

export default GoogleLogin
