import { ReactNode, useEffect, useRef, useState, useTransition } from 'react'
import Typography from '@/components/UI/Typography'
import cn from 'classnames'
import styles from './OTPModal.module.scss'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/UI/Button'
import { getErrorMessage } from '@/utils/errors'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { OTPCodeSchema, OTPCodeValidator } from '@/types/schemas/otpModal'
import MultiDigitInput from '@/components/MultiDigitInput'
import { BsCheckCircleFill as SuccessIcon } from 'react-icons/bs'
import { APIResponse } from '@/types/api'
import { notify } from '@/lib/toastify'
import { useTimer } from '@/hooks/useTimer'
import { getSuccessMessage } from '@/utils/api'

interface PropTypes {
  onSubmit: (code: string) => Promise<{ data: APIResponse }>
  onSuccess: (value?: string) => Promise<{ data: APIResponse } | void>
  onResend: () => Promise<{ data: APIResponse }>
  onCancel: () => void
  message?: ReactNode
  expirationTime: number
  digitsNumber: number
}

const SUBMIT_LIMIT = 3

const OTPModal = ({
  onSubmit,
  onResend,
  onCancel,
  onSuccess,
  message,
  expirationTime,
  digitsNumber,
}: PropTypes) => {
  const contentRef = useRef<HTMLDivElement | null>(null)
  const [maxHeight, setMaxHeight] = useState(contentRef?.current?.scrollHeight)
  const [isPending, startTransition] = useTransition()
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)
  const [t, t_zod] = [useTranslations('OTPModal'), useTranslations('Zod')]

  const {
    timeLeft,
    isActiveTimer,
    start: startResendTimer,
  } = useTimer({ seconds: 30 })

  const [isError, isSuccess] = [
    statusMessage?.type === 'error',
    statusMessage?.type === 'success',
  ]

  const {
    handleSubmit,
    watch,
    formState: { errors, submitCount },
    setValue,
  } = useForm<OTPCodeSchema>({
    resolver: zodResolver(OTPCodeValidator(t_zod)),
    delayError: 400,
    mode: 'onChange',
    defaultValues: { code: '' },
  })
  const code = watch('code') // Needed to prevent state delay

  const hasExceededAttempts = submitCount >= SUBMIT_LIMIT // TODO add cooldown
  const isVerifyDisabled = isPending || !!errors.code || hasExceededAttempts

  useEffect(() => {
    setValue('code', code, { shouldValidate: true }) // Initialise validation for empty code on mount
  }, [code, setValue])

  const handleVerify = () => {
    startTransition(async () => {
      if (hasExceededAttempts)
        return setStatusMessage({
          type: 'error',
          message: t('too_many_attempts'),
        })

      try {
        const res = await onSubmit(code)
        setStatusMessage({
          type: 'success',
          message: getSuccessMessage(res),
        })

        await onSuccess()
      } catch (err) {
        console.error('Error in OTPModal handleSubmit:', getErrorMessage(err))
        setStatusMessage({
          type: 'error',
          message: await getErrorMessage(err),
        })
      }
    })
  }

  const handleResend = () => {
    if (isActiveTimer) return

    startTransition(async () => {
      try {
        await onResend()
        notify('success', t('code_resent'))
        handleResetCode()
        startResendTimer()
      } catch (err) {
        console.error('Error in OTPModal handleResend:', getErrorMessage(err))
        notify('error', await getErrorMessage(err))
      }
    })
  }

  const handleCodeChange = (newCode: string) => {
    setValue('code', newCode, { shouldValidate: true })
  }

  const handleResetCode = () => setValue('code', '')

  const Success = () => (
    <div className={styles.success}>
      <div className={styles.successHeading}>
        <SuccessIcon color="var(--primary-green-color)" size={35} />
        <Typography weight="semiBold">{statusMessage?.message}</Typography>
      </div>
      <Button variation="secondary" onClick={onCancel}>
        {t('ok')}
      </Button>
    </div>
  )

  useEffect(() => {
    if (isSuccess && contentRef.current) {
      setMaxHeight(contentRef.current.scrollHeight)
    }
  }, [isSuccess])

  return (
    <div
      className={styles.root}
      ref={contentRef}
      style={{ maxHeight: `${maxHeight}px` }}
    >
      {isSuccess ? (
        <Success />
      ) : (
        <>
          <div className={styles.heading}>
            <Typography weight="semiLight">
              {message ?? t('otp_required')}
            </Typography>
            <Typography
              className={styles.expiration}
              size="s"
              weight="semiLight"
            >
              {t.rich('expires_in', {
                em: text => <Typography tag="span">{text}</Typography>,
                expirationTime,
              })}
            </Typography>
          </div>
          <div className={styles.ctaSection}>
            <form
              noValidate
              className={styles.inputContainer}
              method="POST"
              onSubmit={handleSubmit(handleVerify)}
            >
              <MultiDigitInput
                autoFocus
                ariaLabel={t('input_code')}
                className={styles.input}
                hasError={isError}
                isDisabled={isPending}
                n={digitsNumber}
                testId="otp-modal-code"
                onChange={handleCodeChange}
              />
              <Typography
                className={cn(styles.error, 'hidden', { visible: isError })}
                color="var(--primary-red-color)"
                size="s"
                weight="semiBold"
              >
                {statusMessage?.message}
              </Typography>

              <div className={styles.cta}>
                <Button
                  isFullWidth
                  disabled={isVerifyDisabled}
                  isLoading={isPending}
                  size="xs"
                  type="submit"
                  variation="primary"
                >
                  {t('verify')}
                </Button>

                <Button
                  isFullWidth
                  disabled={isPending}
                  size="xs"
                  variation="secondary"
                  onClick={onCancel}
                >
                  {t('cancel')}
                </Button>
              </div>
            </form>

            <Typography weight="semiLight">
              {t.rich('not_received', {
                cta: text => (
                  <Typography
                    className={styles.resend}
                    tag="span"
                    testId="otp-modal-resend-code"
                    title={t('resend')}
                    onClick={handleResend}
                  >
                    {isActiveTimer
                      ? t('wait_before_resend', { time: timeLeft })
                      : text}
                  </Typography>
                ),
              })}
            </Typography>
          </div>
        </>
      )}
    </div>
  )
}

export default OTPModal
