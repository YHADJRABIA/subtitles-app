'use client'
import React from 'react'
import { MdAlternateEmail as EmailIcon } from 'react-icons/md'

import {
  BsSendCheck as EmailSentIcon,
  BsXCircle as ErrorIcon,
} from 'react-icons/bs'

import styles from './SendVerificationEmailForm.module.scss'
import { Button } from '@/components/UI/Button'

import Field from '@/components/Forms/Field'

import { getErrorMessage } from '@/utils/errors'

import TextInBox from '../TextInBox'
import Typography from '../UI/Typography'
import useInfo from '@/hooks/useInfo'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  SendEmailVerificationSchema,
  SendEmailVerificationValidator,
} from '@/types/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { handleSendVerificationEmail } from '@/actions/auth'
import { Link } from '@/lib/i18n/navigation'

const SendVerificationEmailForm = () => {
  const [t, t_zod] = [useTranslations('Auth'), useTranslations('Zod')]

  const { info, setInfoMessage } = useInfo()
  const {
    register,
    getFieldState,
    getValues,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SendEmailVerificationSchema>({
    resolver: zodResolver(SendEmailVerificationValidator(t_zod)),
    delayError: 400,
    mode: 'onChange',
  })

  const fieldState = getFieldState('email')
  const email = getValues('email')

  const InfoIcon = info.type === 'error' ? ErrorIcon : EmailSentIcon // TODO: update

  const handleVerify: SubmitHandler<
    SendEmailVerificationSchema
  > = async user => {
    try {
      const res = await handleSendVerificationEmail(user)
      setInfoMessage(res.data.message, 'success')
    } catch (err) {
      setInfoMessage(await getErrorMessage(err), 'error')
    }
  }

  return (
    <form
      noValidate
      method="POST"
      className={styles.root}
      onSubmit={handleSubmit(handleVerify)}
    >
      <div className={styles.wrapper}>
        <Typography tag="h1" weight="semiBold" className={styles.title}>
          {t('SendVerificationEmail.title')}
        </Typography>

        <TextInBox
          icon={InfoIcon}
          label={info.label}
          type={info.type}
          isShown={!!info.label}
        />

        <Field
          autoFocus
          className={styles.field}
          register={register}
          placeholder="email@domain.com"
          type="email"
          name="email"
          label={t('email')}
          testId="verify-email"
          leftIcon={{ src: EmailIcon, title: t('email') }}
          subLabel={{
            text: errors?.email?.message,
            isShown: fieldState.isTouched,
          }}
        />

        <Button
          className={styles.cta}
          variation="primary"
          testId="submit-email-verification-form"
          disabled={!isValid}
          isLoading={isSubmitting}
          type="submit"
          weight="semiBold"
          size="xs"
        >
          {t('SendVerificationEmail.cta')}
        </Button>
      </div>
      <Typography align="center">
        {t.rich('SendVerificationEmail.fallback', {
          login: text => (
            <Link href={isValid ? `/login?email=${email}` : '/login'}>
              {text}
            </Link>
          ),
          register: text => (
            <Link href={isValid ? `/register?email=${email}` : '/register'}>
              {text}
            </Link>
          ),
        })}
      </Typography>
    </form>
  )
}

export default SendVerificationEmailForm
