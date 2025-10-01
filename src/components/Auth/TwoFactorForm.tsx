'use client'
import React from 'react'
import { useRouter } from '@/i18n/routing'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'

import { TwoFactorVerificationValidator } from '@/types/schemas/auth'
import { handleVerifyTwoFactorCode } from '@/actions/auth'
import { DEFAULT_LOGIN_REDIRECT_ROUTE } from '@/routes/routes'
import { getErrorMessage } from '@/utils/errors'

import styles from './AuthForm.module.scss'
import { Button } from '@/components/UI/Button'
import Field from '@/components/Forms/Field'
import TextInBox from '../TextInBox'
import Typography from '../UI/Typography'
import useInfo from '@/hooks/useInfo'
import {
  BsSendCheck as EmailSentIcon,
  BsXCircle as ErrorIcon,
} from 'react-icons/bs'

interface PropTypes {
  email: string
}

function TwoFactorForm({ email }: PropTypes) {
  const router = useRouter()
  const [t, t_zod] = [useTranslations('Auth'), useTranslations('Zod')]

  const { info, setInfoMessage } = useInfo()
  const isSuccessIcon = info.type === 'success'
  const InfoIcon = isSuccessIcon ? EmailSentIcon : ErrorIcon

  const {
    register,
    getFieldState,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(TwoFactorVerificationValidator(t_zod)),
    defaultValues: { email, code: '' },
    delayError: 400,
    mode: 'onChange',
  })

  const handleVerify2FA: SubmitHandler<{
    email: string
    code: string
  }> = async data => {
    try {
      // Verify 2FA code
      const res = await handleVerifyTwoFactorCode({
        email: data.email,
        code: data.code,
      })

      if (res?.data?.success) {
        router.push(DEFAULT_LOGIN_REDIRECT_ROUTE)
      }
    } catch (err) {
      setInfoMessage(await getErrorMessage(err), 'error')
    }
  }

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

        <input type="hidden" {...register('email')} />

        {/* TODO: replace with MultiDigitInput + add resend option and back-to-login button */}
        <Field
          autoFocus
          label={t('2FA.code_label')}
          name="code"
          placeholder="0000"
          register={register}
          subLabel={{
            text: errors?.code?.message,
            isShown: getFieldState('code').isTouched,
          }}
          testId="2fa-code-input"
          type="text"
        />

        <Button
          className={styles.cta}
          disabled={!isValid || isSubmitting}
          isLoading={isSubmitting}
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
