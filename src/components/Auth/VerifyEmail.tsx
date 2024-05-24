'use client'

import { getErrorMessage } from '@/utils/errors'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import Loader from '../UI/Loader'
import styles from './VerifyEmail.module.scss'
import Typography from '../UI/Typography'

import {
  BsCheckCircleFill as SuccessIcon,
  BsXCircleFill as ErrorIcon,
} from 'react-icons/bs'
import Link from 'next/link'

const VerifyEmail = () => {
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [info, setInfo] = useState({ label: '', status: '' })

  const handleValidate = useCallback(async () => {
    try {
      const res = await axios.post('/api/users/verify-token', { token })
      setInfo({ label: res.data.message, status: 'success' })
    } catch (err) {
      setInfo({
        label: getErrorMessage(err?.response.data.message),
        status: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }, [token])

  useEffect(() => {
    if (!token) {
      setIsLoading(false)
      return setInfo({ label: 'No token provided', status: 'error' })
    }
  }, [])

  useEffect(() => {
    token && handleValidate()
  }, [])

  const isError = info.status === 'error'

  const Icon = isError ? ErrorIcon : SuccessIcon

  return (
    <div className={styles.root}>
      <div className={styles.loadingSection}>
        {isLoading ? (
          <>
            <Loader size={22} />
            <Typography>Verifying your account</Typography>
          </>
        ) : (
          <>
            <Icon
              style={{
                fontSize: 18,
                color: isError
                  ? 'var(--primary-red-color)'
                  : 'var(--primary-green-color)',
              }}
            />
            <Typography>{info.label}</Typography>
          </>
        )}
      </div>
      {isError && (
        <Typography>
          Having an issue?{' '}
          <Link href="/send-verification-email">Resend verification email</Link>{' '}
          {/* TODO: Send automatically to associated user if expired token for UX */}
        </Typography>
      )}
    </div>
  )
}

export default VerifyEmail
