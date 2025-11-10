'use client'
import { getErrorMessage } from '@/utils/errors'
import { useSearchParams } from 'next/navigation'
import styles from './VerifyEmail.module.scss'
import Typography from '../../UI/Typography'

import {
  BsCheckCircleFill as SuccessIcon,
  BsXCircleFill as ErrorIcon,
} from 'react-icons/bs'
import Loading from './loading'
import { useTranslations } from 'next-intl'
import useInfo from '@/hooks/useInfo'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  EmailVerificationByTokenSchema,
  EmailVerificationByTokenValidator,
} from '@/types/schemas/auth'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import { handleVerifyEmailValidationToken } from '@/actions/auth'
import { Link } from '@/i18n/routing'
import { getSuccessMessage } from '@/utils/api'
import { colors } from '@/utils/color'

const VerifyEmail = () => {
  const [t, t_zod] = [
    useTranslations('Auth.VerifyEmail'),
    useTranslations('Zod'),
  ]

  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''

  const { info, setInfoMessage } = useInfo()

  const handleValidate: SubmitHandler<
    EmailVerificationByTokenSchema
  > = async user => {
    try {
      const res = await handleVerifyEmailValidationToken(user)
      setInfoMessage(getSuccessMessage(res), 'success')
    } catch (err) {
      setInfoMessage(await getErrorMessage(err), 'error')
    }
  }

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitted },
  } = useForm<EmailVerificationByTokenSchema>({
    resolver: zodResolver(EmailVerificationByTokenValidator(t_zod)),
    delayError: 400,
    mode: 'onChange',
  })

  // Set token's value programmatically since no existing field
  useIsomorphicLayoutEffect(() => {
    setValue('token', token)
  }, [token])

  useIsomorphicLayoutEffect(() => {
    if (!token) return setInfoMessage(t_zod('token.missing'), 'error')
    handleSubmit(handleValidate)()
  }, [])

  const isError = info.type === 'error'

  const Icon = isError ? ErrorIcon : SuccessIcon

  const showLoader = !(isSubmitted || isError)
  return (
    <div className={styles.root}>
      <div className={styles.loadingSection}>
        {showLoader ? (
          <Loading label={t('loading')} />
        ) : (
          <>
            <Icon
              style={{
                fontSize: 22,
                color: isError ? colors.red.primary : colors.green.primary,
              }}
            />
            <Typography weight="semiBold">{info.label}</Typography>
          </>
        )}
      </div>
      {isSubmitted && (
        <Typography className={styles.cta}>
          {isError ? (
            t.rich('resend_email', {
              link: text => <Link href="/send-verification-email">{text}</Link>,
            })
          ) : (
            <Link href="/login">{t('fallback')}</Link>
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
