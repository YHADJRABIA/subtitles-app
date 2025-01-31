import React, { ReactNode, useEffect, useRef, useState } from 'react'
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

interface PropTypes {
  onSubmit: (code: string) => Promise<{ data: APIResponse }>
  onSuccess: (value?: string) => Promise<{ data: APIResponse } | void>
  onResend: () => Promise<{ data: APIResponse }>
  onCancel: () => void
  message?: ReactNode
  expirationTime: number
  digitsNumber: number
}

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
  const [isLoading, setisLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState('')
  const [t, t_zod] = [useTranslations('OTPModal'), useTranslations('Zod')]

  const hasError = !!error.length
  const isValidated = !!successMessage.length

  const {
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<OTPCodeSchema>({
    resolver: zodResolver(OTPCodeValidator(t_zod)),
    delayError: 400,
    mode: 'onChange',
    defaultValues: { code: '' },
  })
  const code = watch('code') // If not set, form inputs with more than 1 character will be delayed

  // TODO: cancel after 3 unsuccessful tries

  useEffect(() => {
    // Initialize validation for empty code on mount
    setValue('code', code, { shouldValidate: true })
  }, [code, setValue])

  const handleVerify = async () => {
    setisLoading(true)
    try {
      const res = await onSubmit(code)
      setSuccessMessage(res.data?.message ?? '')
      await onSuccess()
    } catch (err) {
      console.error('Error in OTPModal handleSubmit:', getErrorMessage(err))
      setError(await getErrorMessage(err))
    } finally {
      setisLoading(false)
    }
  }

  const handleResend = async () => {
    setisLoading(true)
    try {
      await onResend()
      handleResetCode()
      // TODO: restrict resend with timer
    } catch (err) {
      console.error('Error in OTPModal handleResend:', getErrorMessage(err))
    } finally {
      setisLoading(false)
    }
  }

  const handleCodeChange = (newCode: string) => {
    setValue('code', newCode, { shouldValidate: true })
  }

  const handleResetCode = () => setValue('code', '')

  const Success = () => (
    <div className={styles.success}>
      <div className={styles.successHeading}>
        <SuccessIcon color="var(--primary-green-color)" size={40} />
        <Typography weight="semiBold">{successMessage}</Typography>
      </div>
      <Button variation="secondary" onClick={onCancel}>
        {t('ok')}
      </Button>
    </div>
  )

  useEffect(() => {
    if (isValidated && contentRef.current) {
      setMaxHeight(contentRef.current.scrollHeight)
    }
  }, [isValidated])

  return (
    <div
      className={styles.root}
      ref={contentRef}
      style={{ maxHeight: `${maxHeight}px` }}
    >
      {isValidated ? (
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
                hasError={hasError}
                isDisabled={isLoading}
                n={digitsNumber}
                testId="otp-modal-code"
                value={code}
                onChange={handleCodeChange}
              />
              <Typography
                className={cn(styles.error, 'hidden', { visible: hasError })}
                color="var(--primary-red-color)"
                size="s"
                weight="semiBold"
              >
                {error}
              </Typography>

              <div className={styles.cta}>
                <Button
                  isFullWidth
                  disabled={isLoading || !!errors.code}
                  isLoading={isLoading}
                  size="xs"
                  type="submit"
                  variation="primary"
                >
                  {t('verify')}
                </Button>

                <Button
                  isFullWidth
                  disabled={isLoading}
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
                    {text}
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
