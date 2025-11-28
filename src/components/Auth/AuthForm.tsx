'use client'
import { Link, useRouter } from '@/i18n/routing'
import React, { KeyboardEvent, useState } from 'react'
import {
  MdLockOutline as PasswordIcon,
  MdAlternateEmail as EmailIcon,
} from 'react-icons/md'

import {
  BsSendCheck as EmailSentIcon,
  BsXCircle as ErrorIcon,
} from 'react-icons/bs'

import styles from './AuthForm.module.scss'
import { Button } from '@/components/UI/Button'
import { useShowPassword } from '@/hooks/useShowPassword'
import Separator from '@/components/Separator'
import Field from '@/components/Forms/Field'

import { getErrorMessage } from '@/utils/errors'
import GoogleLogin from '@/components/Auth/GoogleLogin'
import TwoFactorForm from '@/components/Auth/TwoFactorForm'
import {
  handleRegister,
  handleCredentialsLogin,
  handleGoogleLogin,
} from '@/actions/auth'
import TextInBox from '../TextInBox'
import Typography from '../UI/Typography'
import useInfo from '@/hooks/useInfo'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  AccountLoginValidator,
  AccountRegistrationValidator,
  AuthFormData,
} from '@/types/schemas/auth'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { DEFAULT_LOGIN_REDIRECT_ROUTE, routes } from '@/routes/routes'
import { getSuccessMessage } from '@/utils/api'

interface PropTypes {
  type: 'login' | 'register'
}

function AuthForm({ type }: PropTypes) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryParamEmail = searchParams.get('email') ?? ''
  const [isLoginForm, isRegisterForm] = [type === 'login', type === 'register']
  const [passwordInputType, ToggleIcon] = useShowPassword({ size: 18 })
  const [showResendEmail, setShowResendEmail] = useState(false)
  const [is2FA, setIs2FA] = useState(false)

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
    defaultValues: { email: queryParamEmail, password: '' },
    delayError: 400,
    mode: 'onChange',
  })

  const isSubmittable = isValid && !isSubmitting

  const fieldState = {
    email: getFieldState('email'),
    password: getFieldState('password'),
  }

  const email = getValues('email')
  const password = getValues('password')
  const isValidEmail = !!email?.length && !fieldState.email.error

  const handleAuth: SubmitHandler<AuthFormData> = async user => {
    try {
      const res = isRegisterForm
        ? await handleRegister(user)
        : await handleCredentialsLogin(user)

      if (isLoginForm && res?.data?.requiresUserAction) {
        return setIs2FA(true)
      }

      // Redirect if successful login
      if (isLoginForm) router.push(DEFAULT_LOGIN_REDIRECT_ROUTE)

      if (isRegisterForm && res) {
        setInfoMessage(getSuccessMessage(res), 'success')
      }

      if (res?.data!.requiresUserAction) setShowResendEmail(true)
    } catch (err) {
      setInfoMessage(await getErrorMessage(err), 'error')
    }
  }

  const handleSubmitOnEnterKey = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && isSubmittable) {
      e.preventDefault()
      handleSubmit(handleAuth)()
    }
  }

  // TODO: Add Google Recaptcha to prevent abuse
  if (is2FA) return <TwoFactorForm email={email} password={password} />

  return (
    <form
      noValidate
      className={styles.root}
      method="POST"
      role="form"
      onKeyDown={handleSubmitOnEnterKey}
      onSubmit={handleSubmit(handleAuth)}
    >
      <div className={styles.wrapper}>
        <Typography
          align="center"
          className={styles.title}
          tag="h1"
          weight="semiBold"
        >
          {t(isRegisterForm ? 'Register.title' : 'Login.title')}
        </Typography>
        <TextInBox
          className={styles.formMessage}
          icon={InfoIcon}
          isShown={!!info.label}
          label={info.label}
          type={info.type}
        />
        {showResendEmail && (
          <>
            <Typography
              className={styles.resendEmail}
              link={{
                href: isValidEmail
                  ? `/send-verification-email?email=${email}`
                  : '/send-verification-email',
              }}
              size="xxs"
              weight="semiBold"
            >
              {t('Register.resend_email')}
            </Typography>
            <Separator className={styles.emailSeparator} />
          </>
        )}

        <Field
          autoFocus
          className={styles.emailField}
          label={t('email')}
          leftIcon={{ src: EmailIcon, title: t('email') }}
          name="email"
          placeholder="email@domain.com"
          register={register}
          subLabel={{
            text: errors?.email?.message,
            isShown: fieldState.email.isTouched,
          }}
          testId={isRegisterForm ? 'register-email' : 'login-email'}
          type="email"
        />

        <Field
          label={t('password')}
          leftIcon={{ src: PasswordIcon, title: t('password') }}
          name="password"
          placeholder={
            passwordInputType === 'password' ? '••••••' : 'MyPa$$word_'
          }
          register={register}
          rightIcon={{ src: ToggleIcon }}
          subLabel={{
            text: errors?.password?.message,
            isShown: true,
            isInfo: isRegisterForm,
          }}
          testId={isRegisterForm ? 'register-password' : 'login-password'}
          type={passwordInputType}
        />

        {isLoginForm && (
          <Typography
            align="right"
            className={styles.passwordRecovery}
            link={{
              href: isValidEmail
                ? `/password/recovery?email=${email}`
                : '/password/recovery',
            }}
            size="xxs"
            weight="semiBold"
          >
            {t('Login.recover_password')}
          </Typography>
        )}

        <Button
          className={styles.cta}
          disabled={!isSubmittable}
          isLoading={isSubmitting}
          size="xs"
          testId={isRegisterForm ? 'submit-register-form' : 'submit-login-form'}
          type="submit"
          variation="primary"
          weight="semiBold"
        >
          {t(isRegisterForm ? 'Register.cta' : 'Login.cta')}
        </Button>

        <Separator className={styles.separator} label={t_general('or')} />
        <GoogleLogin
          disabled={isSubmitting}
          label={t('continue_with_google')}
          onClick={handleGoogleLogin}
        />
      </div>
      <Typography align="center">
        {t.rich(isRegisterForm ? 'Register.fallback' : 'Login.fallback', {
          link: text => (
            <Link
              href={isRegisterForm ? routes['/login'] : routes['/register']}
            >
              {text}
            </Link>
          ),
        })}
      </Typography>
    </form>
  )
}

export default AuthForm
