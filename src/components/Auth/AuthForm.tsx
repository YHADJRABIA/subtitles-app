'use client'
import { Link, useRouter } from '@/i18n/routing'
import React from 'react'
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
import {
  handleRegister,
  handleCredentialsLogin,
  handleGoogleLogin,
} from '@/actions/auth'
import TextInBox from '../TextInBox'
import Typography from '../UI/Typography'
import useInfo from '@/hooks/useInfo'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  AccountLoginValidator,
  AccountRegistrationValidator,
  AuthFormData,
} from '@/types/schemas/auth'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { DEFAULT_LOGIN_REDIRECT_ROUTE } from '@/routes/routes'
import { AxiosResponse } from 'axios'

interface PropTypes {
  type: 'login' | 'register'
}

function AuthForm({ type }: PropTypes) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryParamEmail = searchParams.get('email') ?? ''
  const [isLoginForm, isRegisterForm] = [type === 'login', type === 'register']
  const [passwordInputType, ToggleIcon] = useShowPassword({ size: 18 })

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
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
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

  const fieldState = {
    email: getFieldState('email'),
    password: getFieldState('password'),
  }

  const email = getValues('email')
  const isValidEmail = !!email?.length && !fieldState.email.error

  const handleAuth: SubmitHandler<AuthFormData> = async user => {
    try {
      const res = isRegisterForm
        ? await handleRegister(user)
        : await handleCredentialsLogin(user)

      if (isLoginForm) {
        // Redirect if successful login
        router.push(DEFAULT_LOGIN_REDIRECT_ROUTE)
      }

      if (isRegisterForm) {
        setInfoMessage((res as AxiosResponse)?.data.message, 'success')
      }
    } catch (err) {
      setInfoMessage(await getErrorMessage(err), 'error')
    }
  }

  const showResendEmail = isRegisterForm && isSubmitSuccessful && isSuccessIcon

  // TODO: Add Google Recaptcha to prevent abuse + improve UX with resend validation email
  return (
    <form
      noValidate
      method="POST"
      className={styles.root}
      onSubmit={handleSubmit(handleAuth as SubmitHandler<FieldValues>)}
    >
      <div className={styles.wrapper}>
        <Typography
          className={styles.title}
          align="center"
          tag="h1"
          weight="semiBold"
        >
          {t(isRegisterForm ? 'Register.title' : 'Login.title')}
        </Typography>
        <TextInBox
          icon={InfoIcon}
          label={info.label}
          type={info.type}
          isShown={!!info.label}
          className={styles.formMessage}
        />
        {showResendEmail && (
          <Typography
            className={styles.resendEmail}
            size="xxs"
            weight="semiBold"
            link={{
              href: isValidEmail
                ? `/send-verification-email?email=${email}`
                : '/send-verification-email',
            }}
          >
            {t('Register.resend_email')}
          </Typography>
        )}

        <Field
          autoFocus
          className={styles.emailField}
          register={register}
          placeholder="email@domain.com"
          type="email"
          name="email"
          label={t('email')}
          testId={isRegisterForm ? 'register-email' : 'login-email'}
          leftIcon={{ src: EmailIcon, title: t('email') }}
          subLabel={{
            text: errors?.email?.message,
            isShown: fieldState.email.isTouched,
          }}
        />

        <Field
          type={passwordInputType}
          register={register}
          name="password"
          testId={isRegisterForm ? 'register-password' : 'login-password'}
          label={t('password')}
          leftIcon={{ src: PasswordIcon, title: t('password') }}
          rightIcon={{ src: ToggleIcon }}
          placeholder={
            passwordInputType === 'password' ? '••••••' : 'MyPa$$word_'
          }
          subLabel={{
            text: errors?.password?.message,
            isShown: true,
            isInfo: isRegisterForm,
          }}
        />

        {isLoginForm && (
          <Typography
            className={styles.passwordRecovery}
            align="right"
            weight="semiBold"
            size="xxs"
            link={{
              href: isValidEmail
                ? `/password/recovery?email=${email}`
                : '/password/recovery',
            }}
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
          weight="semiBold"
          size="xs"
        >
          {t(isRegisterForm ? 'Register.cta' : 'Login.cta')}
        </Button>

        <Separator label={t_general('or')} className={styles.separator} />
        <GoogleLogin
          disabled={isSubmitting}
          label={t('continue_with_google')}
          onClick={handleGoogleLogin}
        />
      </div>
      <Typography align="center">
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
