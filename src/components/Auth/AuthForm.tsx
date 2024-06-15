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
  AccountLoginSchema,
  AccountLoginValidator,
  AccountRegistrationSchema,
  AccountRegistrationValidator,
  AuthFormData,
} from '@/types/schemas/auth'
import { useTranslations } from 'next-intl'

type FormData = AccountRegistrationSchema | AccountLoginSchema

interface PropTypes {
  type: 'login' | 'register'
  /*   onSubmit: SubmitHandler<FieldValues> */
  onSubmit: (user: AuthFormData) => Promise<void>
}

// TODO: work in progress

function AuthForm({ type, onSubmit }: PropTypes) {
  const isRegisterForm = type === 'register'
  const router = useRouter() // TODO: Redirect if logged in
  const [passwordInputType, ToggleIcon] = useShowPassword({ size: 20 })
  const t = {
    general: useTranslations('General'),
    auth: useTranslations('Auth'),
    zod: useTranslations('Zod'),
  }

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
        ? AccountRegistrationValidator(t.zod)
        : AccountLoginValidator(t.zod)
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
        {t.auth(isRegisterForm ? 'Register.title' : 'Login.title')}
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
          subLabel={{
            text: errors?.email?.message,
            isShown: fieldState.email.isTouched,
          }}
          testId={isRegisterForm ? 'register-email' : 'login-email'}
          leftIcon={
            <EmailIcon
              style={{ fontSize: 18 }}
              title={t.auth('email')} // TODO: rework this
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
          label={t.auth('password')}
          subLabel={{
            text: errors?.password?.message,
            isShown: fieldState.password.isTouched,
            isInfo: isRegisterForm,
          }}
          leftIcon={
            <PasswordIcon
              size={18}
              title={t.auth('password')} // TODO: rework this
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
            {t.auth('Login.recover_password')}
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
          {t.auth(isRegisterForm ? 'Register.cta' : 'Login.cta')}
        </Button>

        <Separator label={t.general('or')} />
        <GoogleLogin
          disabled={isSubmitting}
          onClick={handleGoogleLogin}
          label={t.auth('continue_with_google')}
        />
      </div>
      <Typography className={styles.link}>
        {t.auth(
          isRegisterForm ? 'Register.existing_account' : 'Login.no_account'
        )}{' '}
        <Link href={isRegisterForm ? '/login' : '/register'}>
          {t.auth(isRegisterForm ? 'Register.fallback' : 'Login.fallback')}
        </Link>
      </Typography>
    </form>
  )
}

export default AuthForm
