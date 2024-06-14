'use client'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'
import { MdAlternateEmail as EmailIcon } from 'react-icons/md'

import {
  BsSendCheck as EmailSentIcon,
  BsXCircle as ErrorIcon,
} from 'react-icons/bs'

import styles from './SendVerificationEmailForm.module.scss'
import Button from '@/components/UI/Button'

import Field from '@/components/Forms/Field'

import { getErrorMessage } from '@/utils/errors'

import InfoBox from '../UI/InfoBox'
import Typography from '../UI/Typography'
import axios from 'axios'
import useInfo from '@/hooks/useInfo'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  SendEmailVerificationSchema,
  SendEmailVerificationValidator,
} from '@/types/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import LanguageMenu from '../Layout/LanguageMenu'
import { useTranslations } from 'next-intl'

const SendVerificationEmailForm = () => {
  const t = { auth: useTranslations('Auth'), zod: useTranslations('Zod') }

  const router = useRouter()
  const { info, setInfoMessage } = useInfo()
  const {
    register,
    getFieldState,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SendEmailVerificationSchema>({
    resolver: zodResolver(SendEmailVerificationValidator(t.zod)),
    delayError: 400,
    mode: 'onChange',
  })

  const fieldState = getFieldState('email')

  const InfoIcon = info.type === 'error' ? ErrorIcon : EmailSentIcon // TODO: update

  const handleVerify: SubmitHandler<
    SendEmailVerificationSchema
  > = async user => {
    try {
      const res = await axios.post('/api/users/send-verification-email', user)
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
      onSubmit={handleSubmit(handleVerify)}
      noValidate
      className={styles.root}
    >
      <LanguageMenu />
      <Typography tag="h1" weight="semiBold" className={styles.title}>
        {t.auth('SendVerificationEmail.title')}
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
          autoFocus
          register={register}
          placeholder="email@domain.com"
          type="email"
          name="email"
          label={t.auth('email')}
          subLabel={{
            text: errors?.email?.message,
            isShown: fieldState.isTouched,
          }}
          testId="verify-email"
          leftIcon={
            <EmailIcon
              style={{ fontSize: 18 }}
              title={t.auth('email')} // TODO: rework this
            />
          }
        />

        <Button
          className={styles.cta}
          variation="primary"
          testId="submit-email-verification-form"
          disabled={!isValid}
          isLoading={isSubmitting}
          type="submit"
        >
          {t.auth('SendVerificationEmail.cta')}
        </Button>
      </div>

      <Link href="/login">{t.auth('SendVerificationEmail.fallback')}</Link>
    </form>
  )
}

export default SendVerificationEmailForm
