'use client'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import {
  MdLockOutline as PasswordIcon,
  MdAlternateEmail as EmailIcon,
} from 'react-icons/md'

import {
  BsSendCheck as EmailSentIcon,
  BsXCircle as ErrorIcon,
} from 'react-icons/bs'

import styles from './RegisterForm.module.scss'
import Button from '@/components/UI/Button'
import { useShowPassword } from '@/hooks/useShowPassword'
import Separator from '@/components/UI/Separator'
import Field from '@/components/Forms/Field'

import { getErrorMessage } from '@/utils/errors'
import GoogleLogin from '@/components/Auth/GoogleLogin'
import { handleGoogleLogin } from '@/lib/auth/actions'
import InfoBox from '../UI/InfoBox'
import Typography from '../UI/Typography'
import LanguageMenu from '../Layout/LanguageMenu'
import useInfo from '@/hooks/useInfo'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  AccountRegistrationSchema,
  AccountRegistrationValidator,
} from '@/types/schemas/auth'
import { useTranslations } from 'next-intl'

const RegisterForm = () => {
  const router = useRouter() // TODO: Redirect if logged in
  const t = {
    general: useTranslations('General'),
    auth: useTranslations('Auth'),
    zod: useTranslations('Zod'),
  }

  const { info, setInfoMessage } = useInfo()
  const {
    register,
    getFieldState,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<AccountRegistrationSchema>({
    resolver: zodResolver(AccountRegistrationValidator(t.zod)),
    delayError: 400,
    mode: 'onChange',
  })

  const fieldState = {
    email: getFieldState('email'),
    password: getFieldState('password'),
  }

  const InfoIcon = info.type === 'success' ? EmailSentIcon : ErrorIcon

  const [passwordInputType, ToggleIcon] = useShowPassword({ size: 20 })

  const handleRegister: SubmitHandler<
    AccountRegistrationSchema
  > = async user => {
    try {
      const res = await axios.post('/api/users/register', user)
      setInfoMessage(res.data.message, 'success')
    } catch (err) {
      setInfoMessage(
        getErrorMessage(err?.response.data.message) ?? getErrorMessage(err),
        'error'
      )
    }
  }

  return (
    <form
      method="POST"
      onSubmit={handleSubmit(handleRegister)}
      noValidate
      className={styles.root}
    >
      <LanguageMenu />
      <Typography className={styles.title} tag="h1" weight="semiBold">
        {t.auth('Register.title')}
      </Typography>

      <div className={styles.wrapper}>
        <InfoBox
          icon={<InfoIcon style={{ fontSize: 18 }} />}
          label={info.label}
          type={info.type}
          isShown={!!info.label}
        />

        <Field
          className={styles.emailField}
          autoFocus
          register={register}
          placeholder="email@domain.com"
          type="email"
          name="email"
          label={t.auth('email')}
          isValid={isValid}
          subLabel={{
            text: errors?.email?.message,
            isShown: fieldState.email.isTouched,
          }}
          testId="login-email"
          leftIcon={
            <EmailIcon
              style={{ fontSize: 18 }}
              title={t.auth('email')} // TODO: rework this
            />
          }
        />

        <Field
          className={styles.passwordField}
          placeholder={
            passwordInputType === 'password' ? '••••••' : 'MyPa$$word_'
          }
          type={passwordInputType}
          register={register}
          name="password"
          testId="login-password"
          label={t.auth('password')}
          isValid={isValid}
          subLabel={{
            text: errors?.password?.message,
            isShown: fieldState.password.isTouched,
            isInfo: true,
          }}
          leftIcon={
            <PasswordIcon
              size={18}
              title={t.auth('password')} // TODO: rework this
            />
          }
          rightIcon={<ToggleIcon />}
        />

        <Button
          variation="primary"
          testId="submit-register-form"
          disabled={!isValid}
          isLoading={isSubmitting}
          type="submit"
        >
          {t.auth('Register.cta')}
        </Button>

        <Separator label={t.general('or')} />
        <GoogleLogin
          disabled={isSubmitting}
          onClick={handleGoogleLogin}
          label={t.auth('continue_with_google')}
        />
      </div>
      <Typography>
        {t.auth('Register.existing_account')}{' '}
        <Link href="/login">{t.auth('Register.fallback')}</Link>
      </Typography>
    </form>
  )
}

export default RegisterForm
