'use client'
import TextInBox from '@/components/TextInBox'
import Typography from '@/components/UI/Typography'
import styles from './PasswordResetForm.module.scss'
import React, { useEffect } from 'react'
import Field from '@/components/Forms/Field'
import { Button } from '@/components/UI/Button'
import { Link } from '@/i18n/routing'
import { MdLockOutline as PasswordIcon } from 'react-icons/md'

import {
  BsFillCheckCircleFill as SuccessIcon,
  BsXCircle as ErrorIcon,
} from 'react-icons/bs'
import { useShowPassword } from '@/hooks/useShowPassword'
import { getErrorMessage } from '@/utils/errors'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import useInfo from '@/hooks/useInfo'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  PasswordResetSchema,
  PasswordResetValidator,
} from '@/types/schemas/auth'
import { getSuccessMessage } from '@/utils/api'
import { handleResetPassword } from '@/actions/auth'

const PasswordResetForm = () => {
  const searchParams = useSearchParams()
  const [t, t_zod] = [useTranslations('Auth'), useTranslations('Zod')]

  const token = searchParams.get('token') ?? ''

  const [passwordInputType, ToggleIcon] = useShowPassword({ size: 18 })
  const { info, setInfoMessage } = useInfo()

  const isError = info.type === 'error'

  const InfoIcon = isError ? ErrorIcon : SuccessIcon

  const {
    register,
    getFieldState,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
  } = useForm<PasswordResetSchema>({
    resolver: zodResolver(PasswordResetValidator(t_zod)),
    delayError: 400,
    mode: 'onChange',
  })

  const passwordField = getFieldState('password')

  const handleReset: SubmitHandler<PasswordResetSchema> = async user => {
    try {
      const res = await handleResetPassword(user)
      setInfoMessage(getSuccessMessage(res), 'success')
    } catch (err) {
      setInfoMessage(await getErrorMessage(err), 'error')
    }
  }

  // Set token's value programmatically since no existing field
  useEffect(() => {
    setValue('token', token)
  }, [setValue, token])

  return (
    <form
      noValidate
      className={styles.root}
      method="POST"
      onSubmit={handleSubmit(handleReset)}
    >
      <div className={styles.wrapper}>
        <Typography className={styles.title} tag="h1" weight="semiBold">
          {t('PasswordReset.title')}
        </Typography>
        <TextInBox
          icon={InfoIcon}
          isShown={!!info.label}
          label={info.label}
          type={info.type}
        />

        <Field
          className={styles.field}
          label={t('new_password')}
          leftIcon={{ src: PasswordIcon, title: t('new_password') }}
          name="password"
          placeholder={
            passwordInputType === 'password' ? '••••••' : 'MyPa$$word_'
          }
          register={register}
          rightIcon={{ src: ToggleIcon }}
          subLabel={{
            text: errors?.password?.message,
            isShown: passwordField.isTouched,
            isInfo: true,
          }}
          testId="reset-password-field"
          type={passwordInputType}
        />

        {!isSubmitSuccessful ? (
          <Button
            className={styles.cta}
            disabled={!isValid}
            isLoading={isSubmitting}
            size="xs"
            testId="submit-reset-password-form"
            type="submit"
            variation="primary"
            weight="semiBold"
          >
            {t('PasswordReset.cta')}
          </Button>
        ) : (
          <Button
            className={styles.cta}
            link={{ href: '/login' }}
            size="xs"
            type="submit"
            variation="secondary"
            weight="semiBold"
          >
            {t('PasswordReset.fallback')}
          </Button>
        )}
      </div>
      {isError && (
        <Link href="/password/recovery">{t('PasswordReset.cta_error')}</Link>
      )}
    </form>
  )
}

export default PasswordResetForm
