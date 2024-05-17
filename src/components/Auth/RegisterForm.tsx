'use client'
import Link from 'next/link'
import React, { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { isValidPassword, isValidEmail } from '@/utils/validators'
import {
  MdLockOutline as PasswordIcon,
  MdAlternateEmail as EmailIcon,
} from 'react-icons/md'

import {
  BsSendCheck as EmailSentIcon,
  BsXCircle as ErrorIcon,
} from 'react-icons/bs'

import styles from './RegisterForm.module.scss'
import Button from '@/components/UI/Button'
import { useShowPassword } from '@/hooks/useShowPassword'
import Separator from '@/components/UI/Separator'
import Field from '@/components/Forms/Field'

import { getErrorMessage } from '@/utils/errors'
import GoogleLogin from '@/components/Auth/GoogleLogin'
import { handleGoogleLogin } from '@/lib/auth/actions'
import InfoBox from '../UI/InfoBox'
import Typography from '../UI/Typography'

const RegisterForm = () => {
  const router = useRouter()

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

  const InfoIcon = info.type === 'success' ? EmailSentIcon : ErrorIcon

  const [passwordInputType, ToggleIcon] = useShowPassword({ size: 20 })

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      await axios.post('/api/users/register', user)
      setInfo({
        label: 'Account created! Verification email sent.',
        type: 'success',
      })
      /*    router.push('/') */
    } catch (err) {
      setInfo({
        label: err?.response.data.message ?? getErrorMessage(err),
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

  const isValidUser = isValidEmail(user.email) && isValidPassword(user.password)

  useEffect(() => {
    setIsDisabled(!isValidUser || isLoading)
  }, [isLoading, isValidUser])
  return (
    <form
      method="POST"
      onSubmit={handleRegister}
      noValidate
      className={styles.formCard}
    >
      <Typography tag="h1" weight="semiBold">
        Create account
      </Typography>

      <div className={styles.wrapper}>
        <InfoBox
          icon={<InfoIcon style={{ fontSize: 18 }} />}
          label={info.label}
          type={info.type}
          isShown={!!info.label}
        />

        <Field
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
          onValidate={isValidPassword}
          onChange={handleInputChange}
          testId="login-password"
          label="Password"
          subLabel={{
            text: 'Password must be at least 6 characters',
          }}
          leftIcon={
            <PasswordIcon
              size={18}
              title="Password" // TODO: rework this
            />
          }
          rightIcon={<ToggleIcon />}
        />

        <Button
          variation="primary"
          testId="submit-register-form"
          disabled={isDisabled}
          isLoading={isLoading}
          type="submit"
        >
          Create account
        </Button>

        <Separator label="Or" />
        <GoogleLogin disabled={isLoading} onClick={handleGoogleLogin} />
      </div>
      <Typography>
        Already have an account? <Link href="/login"> Login here</Link>
      </Typography>
    </form>
  )
}

export default RegisterForm
