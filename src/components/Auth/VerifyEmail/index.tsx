'use client'
import { getErrorMessage } from '@/utils/errors'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import styles from './VerifyEmail.module.scss'
import Typography from '../../UI/Typography'

import {
  BsCheckCircleFill as SuccessIcon,
  BsXCircleFill as ErrorIcon,
} from 'react-icons/bs'
import Link from 'next/link'
import Loading from './loading'
import { useTranslations } from 'next-intl'
import useInfo from '@/hooks/useInfo'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  EmailVerificationSchema,
  EmailVerificationValidator,
} from '@/types/schemas/auth'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

const VerifyEmail = () => {
  const t = {
    verifyEmail: useTranslations('Auth.VerifyEmail'),
    zod: useTranslations('Zod'),
  }

  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''

  const { info, setInfoMessage } = useInfo()

  const handleValidate: SubmitHandler<EmailVerificationSchema> = async user => {
    try {
      const res = await axios.post('/api/users/verify-token', user)
      setInfoMessage(res.data.message, 'success')
    } catch (err) {
      setInfoMessage(
        getErrorMessage(err?.response.data.message) ?? getErrorMessage(err),
        'error'
      )
    }
  }

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitted },
  } = useForm<EmailVerificationSchema>({
    resolver: zodResolver(EmailVerificationValidator(t.zod)),
    delayError: 400,
    mode: 'onChange',
  })

  // Set token's value programmatically since no existing field
  useIsomorphicLayoutEffect(() => {
    setValue('token', token)
  }, [token])

  useIsomorphicLayoutEffect(() => {
    if (!token) return setInfoMessage(t.zod('token.missing'), 'error')
    handleSubmit(handleValidate)()
  }, [])

  const isError = info.type === 'error'

  const Icon = isError ? ErrorIcon : SuccessIcon

  const showLoader = !(isSubmitted || isError)
  return (
    <div className={styles.root}>
      <div className={styles.loadingSection}>
        {showLoader ? (
          <Loading label={t.verifyEmail('loading')} />
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
      {isSubmitted && (
        <Typography className={styles.cta}>
          {isError ? (
            <>
              {t.verifyEmail('issue')}{' '}
              <Link href="/send-verification-email">
                {t.verifyEmail('resend_email')}
              </Link>
            </>
          ) : (
            <Link href="/login">{t.verifyEmail('fallback')}</Link>
          )}
        </Typography>
      )}
    </div>
  )
}

export default VerifyEmail

{
  /* TODO: Send automatically to associated user if expired token for UX */
}
