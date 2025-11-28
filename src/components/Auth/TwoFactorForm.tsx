'use client'
import React, { useEffect, useTransition } from 'react'
import { useRouter, Link } from '@/i18n/routing'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'

import { TwoFactorVerificationValidator } from '@/types/schemas/auth'
import {
  handleVerifyTwoFactorCode,
  handleCredentialsLogin,
  handleResend2FACode,
} from '@/actions/auth'
import { DEFAULT_LOGIN_REDIRECT_ROUTE } from '@/routes/routes'
import { getErrorMessage } from '@/utils/errors'
import { useTimer } from '@/hooks/useTimer'
import { notify } from '@/lib/toastify'

import cn from 'classnames'
import styles from './TwoFactorForm.module.scss'
import { Button } from '@/components/UI/Button'
import MultiDigitInput from '@/components/MultiDigitInput'
import TextInBox from '../TextInBox'
import Typography from '../UI/Typography'
import useInfo from '@/hooks/useInfo'
import {
  BsSendCheck as EmailSentIcon,
  BsXCircle as ErrorIcon,
} from 'react-icons/bs'
import { colors } from '@/utils/color'

interface PropTypes {
  email: string
  password: string
}

const DIGITS_COUNT = 4
const RESEND_COOLDOWN_SECONDS = 30

function TwoFactorForm({ email, password }: PropTypes) {
  const router = useRouter()
  const [t, t_zod] = [useTranslations('Auth'), useTranslations('Zod')]
  const [isPending, startTransition] = useTransition()

  const { info, setInfoMessage, clearInfo } = useInfo()
  const isSuccessIcon = info.type === 'success'
  const InfoIcon = isSuccessIcon ? EmailSentIcon : ErrorIcon

  const {
    timeLeft,
    isActiveTimer,
    start: startResendTimer,
  } = useTimer({ seconds: RESEND_COOLDOWN_SECONDS })

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(TwoFactorVerificationValidator(t_zod)),
    defaultValues: { email, code: '' },
    delayError: 400,
    mode: 'onChange',
  })

  const code = watch('code')

  useEffect(() => {
    setValue('code', code, { shouldValidate: true })
  }, [code, setValue])

  const handleCodeChange = (newCode: string) => {
    setValue('code', newCode, { shouldValidate: true })
    clearInfo()
  }

  const handleVerify2FA = () => {
    startTransition(async () => {
      try {
        const res = await handleVerifyTwoFactorCode({ email, code })

        if (res?.data?.success) {
          const loginRes = await handleCredentialsLogin({ email, password })

          if (loginRes?.data?.success) {
            router.push(DEFAULT_LOGIN_REDIRECT_ROUTE)
          }
        }
      } catch (err) {
        setInfoMessage(await getErrorMessage(err), 'error')
      }
    })
  }

  const handleResend = () => {
    if (isActiveTimer) return

    startTransition(async () => {
      try {
        await handleResend2FACode(email)
        notify('success', t('2FA.code_resent'))
        setValue('code', '')
        clearInfo()
        startResendTimer()
      } catch (err) {
        notify('error', await getErrorMessage(err))
      }
    })
  }

  const isSubmitDisabled = !isValid || isPending

  return (
    <form
      noValidate
      className={styles.root}
      method="POST"
      role="form"
      onSubmit={handleSubmit(handleVerify2FA)}
    >
      <div className={styles.wrapper}>
        <Typography
          align="center"
          className={styles.title}
          tag="h1"
          weight="semiBold"
        >
          {t('2FA.title')}
        </Typography>

        <Typography align="center" className={styles.description} size="xs">
          {t('2FA.description')}
        </Typography>

        <TextInBox
          className={styles.formMessage}
          icon={InfoIcon}
          isShown={!!info.label}
          label={info.label}
          type={info.type}
        />

        <input type="hidden" value={email} />

        <div className={styles.verificationSection}>
          <div className={styles.inputSection}>
            <MultiDigitInput
              autoFocus
              ariaLabel={t('2FA.code_label')}
              hasError={info.type === 'error'}
              isDisabled={isPending}
              n={DIGITS_COUNT}
              testId="2fa-code-input"
              onChange={handleCodeChange}
            />

            {errors?.code?.message && (
              <Typography
                className={styles.codeError}
                color={colors.red.primary}
                size="xs"
              >
                {errors.code.message}
              </Typography>
            )}
          </div>

          <div className={styles.linksRow}>
            <div className={styles.resendText}>
              <Typography size="xs" weight="semiLight">
                {t('2FA.not_received_prefix')}
              </Typography>
              <Typography
                className={cn(styles.resendLink, {
                  [styles.disabeld]: isActiveTimer,
                })}
                size="xs"
                testId="2fa-resend-code"
                weight="semiBold"
                onClick={handleResend}
              >
                {isActiveTimer
                  ? t('2FA.wait_before_resend', { time: timeLeft })
                  : t('2FA.resend_cta')}
              </Typography>
            </div>

            <Link className={styles.backToLogin} href="/login">
              <Typography size="xs">{t('2FA.back_to_login')}</Typography>
            </Link>
          </div>
        </div>

        <Button
          className={styles.cta}
          disabled={isSubmitDisabled}
          isLoading={isPending}
          size="xs"
          testId="submit-2fa-form"
          type="submit"
          variation="primary"
          weight="semiBold"
        >
          {t('2FA.confirm_button')}
        </Button>
      </div>
    </form>
  )
}

export default TwoFactorForm
