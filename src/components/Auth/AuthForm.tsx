'use client'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'
import {
  MdLockOutline as PasswordIcon,
  MdAlternateEmail as EmailIcon,
} from 'react-icons/md'

import {
  BsSendCheck as EmailSentIcon,
  BsXCircle as ErrorIcon,
} from 'react-icons/bs'

import styles from './AuthForm.module.scss'
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
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  AccountLoginValidator,
  AccountRegistrationValidator,
  AuthFormData,
} from '@/types/schemas/auth'
import { useTranslations } from 'next-intl'

interface PropTypes<T> {
  type: 'login' | 'register'
  onSubmit: (user: AuthFormData) => Promise<T>
}

// TODO: work in progress

function AuthForm<T>({ type, onSubmit }: PropTypes<T>) {
  const isRegisterForm = type === 'register'
  const router = useRouter() // TODO: Redirect if logged in
  const [passwordInputType, ToggleIcon] = useShowPassword({ size: 20 })

  const [t, t_general, t_zod] = [
    useTranslations('Auth'),
    useTranslations('General'),
    useTranslations('Zod'),
  ]

  const { info, setInfoMessage } = useInfo()
  const isSuccessIcon = info.type === 'success'
  const InfoIcon = isSuccessIcon ? EmailSentIcon : ErrorIcon

  const {
    register,
    getFieldState,
    handleSubmit,
    getValues,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(
      isRegisterForm
        ? AccountRegistrationValidator(t_zod)
        : AccountLoginValidator(t_zod)
    ),
    delayError: 400,
    mode: 'onChange',
  })

  const fieldState = {
    email: getFieldState('email'),
    password: getFieldState('password'),
  }

  const email = getValues('email')
  const isValidEmail = !!email?.length && !fieldState.email.error

  const handleAuth: SubmitHandler<AuthFormData> = async user => {
    try {
      const res = await onSubmit(user)

      setInfoMessage(
        isRegisterForm ? res.data.message : getErrorMessage(res?.error), // TODO: Edit next-auth's response to match register's
        isRegisterForm ? 'success' : 'error'
      )
    } catch (err) {
      setInfoMessage(
        getErrorMessage(isRegisterForm ? err?.response.data.message : err), // TODO: Edit next-auth's response to match register's
        'error'
      )
    }
  }

  // TODO: Add Google Recaptcha to prevent abuse

  return (
    <form
      method="POST"
      onSubmit={handleSubmit(handleAuth as SubmitHandler<FieldValues>)}
      noValidate
      className={styles.root}
    >
      <LanguageMenu />
      <Typography className={styles.title} tag="h1" weight="semiBold">
        {t(isRegisterForm ? 'Register.title' : 'Login.title')}
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
          label={t('email')}
          subLabel={{
            text: errors?.email?.message,
            isShown: fieldState.email.isTouched,
          }}
          testId={isRegisterForm ? 'register-email' : 'login-email'}
          leftIcon={
            <EmailIcon
              style={{ fontSize: 18 }}
              title={t('email')} // TODO: rework this
            />
          }
        />

        <Field
          placeholder={
            passwordInputType === 'password' ? '••••••' : 'MyPa$$word_'
          }
          type={passwordInputType}
          register={register}
          name="password"
          testId={isRegisterForm ? 'register-password' : 'login-password'}
          label={t('password')}
          subLabel={{
            text: errors?.password?.message,
            isShown: fieldState.password.isTouched,
            isInfo: isRegisterForm,
          }}
          leftIcon={
            <PasswordIcon
              size={18}
              title={t('password')} // TODO: rework this
            />
          }
          rightIcon={<ToggleIcon />}
        />

        {!isRegisterForm && (
          <Typography
            fullWidth
            className={styles.passwordRecovery}
            align="right"
            weight="semiBold"
            size="xs"
            href={
              isValidEmail
                ? `/password/recovery?email=${email}`
                : '/password/recovery'
            }
          >
            {t('Login.recover_password')}
          </Typography>
        )}

        <Button
          className={styles.cta}
          variation="primary"
          testId={isRegisterForm ? 'submit-register-form' : 'submit-login-form'}
          disabled={!isValid}
          isLoading={isSubmitting}
          type="submit"
        >
          {t(isRegisterForm ? 'Register.cta' : 'Login.cta')}
        </Button>

        <Separator label={t_general('or')} />
        <GoogleLogin
          disabled={isSubmitting}
          onClick={handleGoogleLogin}
          label={t('continue_with_google')}
        />
      </div>
      <Typography className={styles.link}>
        {t.rich(isRegisterForm ? 'Register.fallback' : 'Login.fallback', {
          link: text => (
            <Link href={isRegisterForm ? '/login' : '/register'}>{text}</Link>
          ),
        })}
      </Typography>
    </form>
  )
}

export default AuthForm
