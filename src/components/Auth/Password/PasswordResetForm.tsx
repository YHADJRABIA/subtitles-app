'use client'
import InfoBox from '@/components/UI/InfoBox'
import Typography from '@/components/UI/Typography'
import styles from './PasswordResetForm.module.scss'
import React, { useEffect } from 'react'
import Field from '@/components/Forms/Field'
import Button from '@/components/UI/Button'
import Link from 'next/link'
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
import LanguageMenu from '@/components/Layout/LanguageMenu'

const PasswordResetForm = () => {
  const searchParams = useSearchParams()
  const t = {
    auth: useTranslations('Auth'),
    zod: useTranslations('Zod'),
  }

  const token = searchParams.get('token') ?? ''

  const [passwordInputType, ToggleIcon] = useShowPassword({ size: 20 })
  const { info, setInfoMessage } = useInfo()

  const InfoIcon = info.type === 'success' ? SuccessIcon : ErrorIcon // TODO: update

  const {
    register,
    getFieldState,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm<PasswordResetSchema>({
    resolver: zodResolver(PasswordResetValidator(t.zod)),
    delayError: 400,
    mode: 'onChange',
  })

  const fieldState = getFieldState('password')

  const handleReset: SubmitHandler<PasswordResetSchema> = async user => {
    try {
      const res = await axios.post('/api/users/password/reset', user)
      setInfoMessage(res.data.message, 'success')
    } catch (err) {
      setInfoMessage(
        getErrorMessage(err?.response.data.message) ?? getErrorMessage(err),
        'error'
      )
    }
  }

  // Set token's value programmatically since no existing field
  useEffect(() => {
    setValue('token', token)
  }, [setValue, token])

  const isError = info.type === 'error'

  return (
    <form
      method="POST"
      onSubmit={handleSubmit(handleReset)}
      noValidate
      className={styles.root}
    >
      <LanguageMenu />
      <Typography tag="h1" weight="semiBold" className={styles.title}>
        {t.auth('PasswordReset.title')}
      </Typography>

      <div className={styles.wrapper}>
        <InfoBox
          icon={<InfoIcon style={{ fontSize: 18 }} />}
          label={info.label}
          type={info.type}
          isShown={!!info.label}
        />

        <Field
          className={styles.field}
          placeholder={
            passwordInputType === 'password' ? '••••••' : 'MyPa$$word_'
          }
          type={passwordInputType}
          register={register}
          isValid={isValid}
          name="password"
          subLabel={{
            text: errors?.password?.message,
            isShown: fieldState.isTouched,
            isInfo: true,
          }}
          testId="reset-password-field"
          label={t.auth('password')}
          leftIcon={
            <PasswordIcon
              size={18}
              title={t.auth('password')} // TODO: rework this
            />
          }
          rightIcon={<ToggleIcon />}
        />

        <Button
          className={styles.cta}
          variation="primary"
          testId="submit-reset-password-form"
          disabled={!isValid}
          isLoading={isSubmitting}
          type="submit"
        >
          {t.auth('PasswordReset.cta')}
        </Button>
      </div>

      {isError ? (
        <Link href="/password/recovery">
          {t.auth('PasswordReset.cta_error')}
        </Link>
      ) : (
        <Link href="/login"> {t.auth('PasswordReset.fallback')}</Link>
      )}
    </form>
  )
}

export default PasswordResetForm
