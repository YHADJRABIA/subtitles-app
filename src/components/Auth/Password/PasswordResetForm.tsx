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
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import useInfo from '@/hooks/useInfo'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  PasswordResetSchema,
  PasswordResetValidator,
} from '@/types/schemas/auth'

const PasswordResetForm = () => {
  const searchParams = useSearchParams()
  const [t, t_zod] = [useTranslations('Auth'), useTranslations('Zod')]

  const token = searchParams.get('token') ?? ''

  const [passwordInputType, ToggleIcon] = useShowPassword({ size: 18 })
  const { info, setInfoMessage } = useInfo()

  const isError = info.type === 'error'

  const InfoIcon = isError ? ErrorIcon : SuccessIcon // TODO: update

  const {
    register,
    getFieldState,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm<PasswordResetSchema>({
    resolver: zodResolver(PasswordResetValidator(t_zod)),
    delayError: 400,
    mode: 'onChange',
  })

  const fieldState = getFieldState('password')

  const handleReset: SubmitHandler<PasswordResetSchema> = async user => {
    try {
      const res = await axios.post('/api/users/password/reset', user)
      setInfoMessage(res.data.message, 'success')
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
      method="POST"
      className={styles.root}
      onSubmit={handleSubmit(handleReset)}
    >
      <div className={styles.wrapper}>
        <Typography tag="h1" weight="semiBold" className={styles.title}>
          {t('PasswordReset.title')}
        </Typography>
        <TextInBox
          icon={InfoIcon}
          label={info.label}
          type={info.type}
          isShown={!!info.label}
        />

        <Field
          className={styles.field}
          type={passwordInputType}
          register={register}
          name="password"
          testId="reset-password-field"
          label={t('password')}
          leftIcon={{ src: PasswordIcon, title: t('password') }}
          rightIcon={{ src: ToggleIcon }}
          placeholder={
            passwordInputType === 'password' ? '••••••' : 'MyPa$$word_'
          }
          subLabel={{
            text: errors?.password?.message,
            isShown: fieldState.isTouched,
            isInfo: true,
          }}
        />

        <Button
          className={styles.cta}
          variation="primary"
          testId="submit-reset-password-form"
          disabled={!isValid}
          isLoading={isSubmitting}
          type="submit"
          weight="semiBold"
          size="xs"
        >
          {t('PasswordReset.cta')}
        </Button>
      </div>
      <Link href={isError ? '/password/recovery' : '/login'}>
        {t(isError ? 'PasswordReset.cta_error' : 'PasswordReset.fallback')}
      </Link>
    </form>
  )
}

export default PasswordResetForm
