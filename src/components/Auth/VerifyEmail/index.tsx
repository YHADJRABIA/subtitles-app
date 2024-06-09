'use client'
import { getErrorMessage } from '@/utils/errors'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import styles from './VerifyEmail.module.scss'
import Typography from '../../UI/Typography'

import {
  BsCheckCircleFill as SuccessIcon,
  BsXCircleFill as ErrorIcon,
} from 'react-icons/bs'
import Link from 'next/link'
import Loading from './loading'
import { useTranslations } from 'next-intl'

const VerifyEmail = () => {
  const t = useTranslations('Auth.VerifyEmail')

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
          <Loading label={t('loading')} />
        ) : (
          <>
            <Icon
              style={{
                fontSize: 22,
                color: isError
                  ? 'var(--primary-red-color)'
                  : 'var(--primary-green-color)',
              }}
            />
            <Typography weight="semiBold">{info.label}</Typography>
          </>
        )}
      </div>
      {isError && (
        <Typography className={styles.cta}>
          {t('issue')}{' '}
          <Link href="/send-verification-email">{t('resend_email')}</Link>
          {/* TODO: Send automatically to associated user if expired token for UX */}
        </Typography>
      )}
    </div>
  )
}

export default VerifyEmail
