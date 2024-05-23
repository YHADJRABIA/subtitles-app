'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { isValidEmail } from '@/utils/validators'
import { MdAlternateEmail as EmailIcon } from 'react-icons/md'

import {
  BsSendCheck as EmailSentIcon,
  BsXCircle as ErrorIcon,
} from 'react-icons/bs'

import styles from './ResetPasswordForm.module.scss'
import Button from '@/components/UI/Button'

import Field from '@/components/Forms/Field'

import { getErrorMessage } from '@/utils/errors'

import InfoBox from '../UI/InfoBox'
import Typography from '../UI/Typography'
import axios from 'axios'

const ResetPasswordForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const email = searchParams.get('email')

  const [info, setInfo] = useState({
    label: '',
    type: undefined,
  })
  const [user, setUser] = useState({
    email: '',
  })

  const [isDisabled, setIsDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const InfoIcon = info.type === 'error' ? ErrorIcon : EmailSentIcon // TODO: update

  const handleReset = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await axios.post('/api/users/send-recovery-email', user)
      setInfo({
        label: res.data.message,
        type: 'success',
      })
    } catch (err) {
      setInfo({
        label:
          getErrorMessage(err?.response.data.message) ?? getErrorMessage(err),
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

  const isValidUser = isValidEmail(user.email)

  useEffect(() => {
    if (email) setUser({ email })
  }, [email])

  useEffect(() => {
    setIsDisabled(!isValidUser || isLoading)
  }, [isLoading, isValidUser])
  return (
    <form
      method="POST"
      onSubmit={handleReset}
      noValidate
      className={styles.root}
    >
      <Typography tag="h1" weight="semiBold">
        Password recovery
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
          testId="reset-password-email"
          onChange={handleInputChange}
          /* autoFocus */
          leftIcon={
            <EmailIcon
              style={{ fontSize: 18 }}
              title="Email" // TODO: rework this
            />
          }
        />

        <Button
          className={styles.cta}
          variation="primary"
          testId="submit-reset-password-form"
          disabled={isDisabled}
          isLoading={isLoading}
          type="submit"
        >
          Send reset email
        </Button>
      </div>

      <Link href="/login">Back to login</Link>
    </form>
  )
}

export default ResetPasswordForm
