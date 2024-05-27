'use client'
import InfoBox from '@/components/UI/InfoBox'
import Typography from '@/components/UI/Typography'
import styles from './PasswordResetForm.module.scss'
import React, { useCallback, useEffect, useState } from 'react'
import Field from '@/components/Forms/Field'
import Button from '@/components/UI/Button'
import Link from 'next/link'
import { MdLockOutline as PasswordIcon } from 'react-icons/md'

import {
  BsFillCheckCircleFill as SuccessIcon,
  BsXCircle as ErrorIcon,
} from 'react-icons/bs'
import { useShowPassword } from '@/hooks/useShowPassword'
import { getErrorMessage } from '@/utils/errors'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { isValidPassword } from '@/utils/validators'

const PasswordResetForm = () => {
  const searchParams = useSearchParams()

  const token = searchParams.get('token')

  const [info, setInfo] = useState({
    label: '',
    type: undefined,
  })
  const [user, setUser] = useState({
    password: '',
    token,
  })

  const InfoIcon = info.type === 'success' ? SuccessIcon : ErrorIcon // TODO: update

  const [isDisabled, setIsDisabled] = useState(true)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordInputType, ToggleIcon] = useShowPassword({ size: 20 })

  const handleReset = useCallback(
    async (e: any) => {
      e.preventDefault()
      try {
        setIsLoading(true)
        const res = await axios.post('/api/users/password/reset', user)
        setInfo({ label: res.data.message, type: 'success' })
      } catch (err) {
        setInfo({
          label: getErrorMessage(err?.response.data.message),
          type: 'error',
        })
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    },
    [user]
  )

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    return setUser(prev => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    if (!token) {
      setInfo({ label: 'No token provided', type: 'error' })
    }
  }, [token])

  useEffect(() => {
    setIsDisabled(!isValidPassword(user.password) || isLoading)
  }, [isLoading, user.password])

  return (
    <form
      method="POST"
      onSubmit={handleReset}
      noValidate
      className={styles.root}
    >
      <Typography tag="h1" weight="semiBold" className={styles.title}>
        Password reset
      </Typography>

      <div className={styles.wrapper}>
        <InfoBox
          icon={<InfoIcon style={{ fontSize: 18 }} />}
          label={info.label}
          type={info.type}
          isShown={!!info.label}
        />

        <Field
          className={styles.field}
          placeholder={
            passwordInputType === 'password' ? '••••••' : 'MyPa$$word_'
          }
          type={passwordInputType}
          name="password"
          value={user.password}
          onChange={handleInputChange}
          onValidate={isValidPassword}
          subLabel={{
            text: 'Password must contain at least 6 characters',
          }}
          testId="reset-password-field"
          label="Password"
          leftIcon={
            <PasswordIcon
              size={18}
              title="Password" // TODO: rework this
            />
          }
          rightIcon={<ToggleIcon />}
        />

        <Button
          className={styles.cta}
          variation="primary"
          testId="submit-reset-password-form"
          disabled={isDisabled}
          isLoading={isLoading}
          type="submit"
        >
          Confirm password
        </Button>
      </div>

      {isError ? (
        <Link href="/password/recovery">Recover password again</Link>
      ) : (
        <Link href="/login">Back to login</Link>
      )}
    </form>
  )
}

export default PasswordResetForm
