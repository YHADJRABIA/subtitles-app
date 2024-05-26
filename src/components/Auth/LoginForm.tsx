'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isValidEmail, isEmpty } from '@/utils/validators'
import {
  MdLockOutline as PasswordIcon,
  MdAlternateEmail as EmailIcon,
} from 'react-icons/md'

import {
  BsSendCheck as EmailSentIcon,
  BsXCircle as ErrorIcon,
} from 'react-icons/bs'

import styles from './LoginForm.module.scss'
import Button from '@/components/UI/Button'
import { useShowPassword } from '@/hooks/useShowPassword'
import Separator from '@/components/UI/Separator'
import Field from '@/components/Forms/Field'

import { getErrorMessage } from '@/utils/errors'
import GoogleLogin from '@/components/Auth/GoogleLogin'
import { handleGoogleLogin } from '@/lib/auth/actions'
import InfoBox from '../UI/InfoBox'
import Typography from '../UI/Typography'
import { signIn } from 'next-auth/react'

const LoginForm = () => {
  const router = useRouter() // TODO: Redirect if user is logged in

  const [info, setInfo] = useState({
    label: '',
    type: undefined,
  })
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const [isDisabled, setIsDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const InfoIcon = info.type === 'success' ? EmailSentIcon : ErrorIcon // TODO: update

  const [passwordInputType, ToggleIcon] = useShowPassword({ size: 20 })

  const handleLogin = async (e: any) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const res = await signIn('credentials', {
        ...user,
        redirect: false,
      })
      setInfo({
        label: getErrorMessage(res?.error),
        type: 'error',
      })
    } catch (err) {
      setInfo({
        label: getErrorMessage(err),
        type: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    return setUser(prev => ({ ...prev, [name]: value }))
  }

  const isValidUser = isValidEmail(user.email) && !isEmpty(user.password)

  useEffect(() => {
    setIsDisabled(!isValidUser || isLoading)
  }, [isLoading, isValidUser])
  return (
    <form
      method="POST"
      onSubmit={handleLogin}
      noValidate
      className={styles.root}
    >
      <Typography tag="h1" weight="semiBold" className={styles.title}>
        Login
      </Typography>

      <div className={styles.wrapper}>
        <InfoBox
          icon={<InfoIcon style={{ fontSize: 18 }} />}
          label={info.label}
          type={info.type}
          isShown={!!info.label}
        />

        <Field
          autoFocus
          placeholder="email@domain.com"
          type="email"
          name="email"
          label="Email"
          subLabel={{
            text: 'Invalid email format',
            isShownOnFocus: false,
          }}
          onValidate={isValidEmail}
          value={user.email}
          testId="login-email"
          onChange={handleInputChange}
          /* autoFocus */
          leftIcon={
            <EmailIcon
              style={{ fontSize: 18 }}
              title="Email" // TODO: rework this
            />
          }
        />

        <Field
          placeholder={
            passwordInputType === 'password' ? '••••••' : 'MyPa$$word_'
          }
          type={passwordInputType}
          name="password"
          value={user.password}
          onChange={handleInputChange}
          testId="login-password"
          label="Password"
          leftIcon={
            <PasswordIcon
              size={18}
              title="Password" // TODO: rework this
            />
          }
          rightIcon={<ToggleIcon />}
        />
        <Link
          className={styles.passwordRecovery}
          href={
            isValidEmail(user.email)
              ? `/password/recovery?email=${user.email}`
              : '/password/recovery'
          }
        >
          Recover password
        </Link>

        <Button
          variation="primary"
          testId="submit-register-form"
          disabled={isDisabled}
          isLoading={isLoading}
          type="submit"
        >
          Login
        </Button>

        <Separator label="Or" />
        <GoogleLogin disabled={isLoading} onClick={handleGoogleLogin} />
      </div>
      <Typography className={styles.link}>
        No account yet? <Link href="/register">Register here</Link>
      </Typography>
    </form>
  )
}

export default LoginForm
