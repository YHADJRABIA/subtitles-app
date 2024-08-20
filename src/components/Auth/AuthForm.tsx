'use client'
import { Link, useRouter } from '@/lib/i18n/navigation'
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
import { SignInResponse } from 'next-auth/react'

interface PropTypes {
  type: 'login' | 'register'
}

function AuthForm({ type }: PropTypes) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryParamEmail = searchParams.get('email') ?? ''
  const [isLoginForm, isRegisterForm] = [type === 'login', type === 'register']
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
        if ((res as SignInResponse)?.ok) {
          // Redirect if successful login
          router.push(DEFAULT_LOGIN_REDIRECT_ROUTE as string)
        } else {
          setInfoMessage(getErrorMessage(res), 'error')
        }
      }

      if (isRegisterForm) {
        setInfoMessage(getErrorMessage(res), 'success')
      }
    } catch (err) {
      setInfoMessage(getErrorMessage(err), 'error')
    }
  }

  // TODO: Add Google Recaptcha to prevent abuse + improve UX with resend validation email
  return (
    <form
      method="POST"
      onSubmit={handleSubmit(handleAuth as SubmitHandler<FieldValues>)}
      noValidate
      className={styles.root}
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
            text: errors?.email?.message as string,
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
            text: errors?.password?.message as string,
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

        {isLoginForm && (
          <Typography
            className={styles.passwordRecovery}
            align="right"
            weight="semiBold"
            size="xs"
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
        >
          {t(isRegisterForm ? 'Register.cta' : 'Login.cta')}
        </Button>

        <Separator label={t_general('or')} className={styles.separator} />
        <GoogleLogin
          disabled={isSubmitting}
          onClick={handleGoogleLogin}
          label={t('continue_with_google')}
        />
      </div>
      <Typography>
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
