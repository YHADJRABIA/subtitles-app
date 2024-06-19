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
import useInfo from '@/hooks/useInfo'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  SendEmailVerificationSchema,
  SendEmailVerificationValidator,
} from '@/types/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import LanguageMenu from '../Layout/LanguageMenu'
import { useTranslations } from 'next-intl'
import { handleSendVerificationEmail } from '@/lib/auth/actions'

const SendVerificationEmailForm = () => {
  const [t, t_zod] = [useTranslations('Auth'), useTranslations('Zod')]

  const router = useRouter()
  const { info, setInfoMessage } = useInfo()
  const {
    register,
    getFieldState,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SendEmailVerificationSchema>({
    resolver: zodResolver(SendEmailVerificationValidator(t_zod)),
    delayError: 400,
    mode: 'onChange',
  })

  const fieldState = getFieldState('email')

  const InfoIcon = info.type === 'error' ? ErrorIcon : EmailSentIcon // TODO: update

  const handleVerify: SubmitHandler<
    SendEmailVerificationSchema
  > = async user => {
    try {
      const res = await handleSendVerificationEmail(user)
      setInfoMessage(res.data.message, 'success')
    } catch (err) {
      setInfoMessage(getErrorMessage(err), 'error')
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
        {t('SendVerificationEmail.title')}
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
          label={t('email')}
          subLabel={{
            text: errors?.email?.message,
            isShown: fieldState.isTouched,
          }}
          testId="verify-email"
          leftIcon={
            <EmailIcon
              style={{ fontSize: 18 }}
              title={t('email')} // TODO: rework this
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
          {t('SendVerificationEmail.cta')}
        </Button>
      </div>

      <Link href="/login">{t('SendVerificationEmail.fallback')}</Link>
    </form>
  )
}

export default SendVerificationEmailForm
