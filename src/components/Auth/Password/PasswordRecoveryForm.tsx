'use client'
import Link from 'next/link'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { MdAlternateEmail as EmailIcon } from 'react-icons/md'

import {
  BsSendCheck as EmailSentIcon,
  BsXCircle as ErrorIcon,
} from 'react-icons/bs'

import styles from './PasswordRecoveryForm.module.scss'
import Button from '@/components/UI/Button'

import Field from '@/components/Forms/Field'

import { getErrorMessage } from '@/utils/errors'

import axios from 'axios'
import InfoBox from '@/components/UI/InfoBox'
import Typography from '@/components/UI/Typography'
import {
  PasswordRecoveryValidator,
  PasswordRecoverySchema,
} from '@/types/schemas/auth'
import { SubmitHandler, useForm } from 'react-hook-form'
import useInfo from '@/hooks/useInfo'
import LanguageMenu from '@/components/Layout/LanguageMenu'
import { useTranslations } from 'next-intl'

const PasswordRecoveryForm = () => {
  const searchParams = useSearchParams()
  const t = {
    auth: useTranslations('Auth'),
    zod: useTranslations('Zod'),
  }
  const queryParamEmail = searchParams.get('email') ?? ''

  const { info, setInfoMessage } = useInfo()

  const {
    register,
    getFieldState,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<PasswordRecoverySchema>({
    resolver: zodResolver(PasswordRecoveryValidator(t.zod)),
    defaultValues: { email: queryParamEmail },
    delayError: 400,
    mode: 'onChange',
  })

  const fieldState = getFieldState('email')

  const InfoIcon = info.type === 'error' ? ErrorIcon : EmailSentIcon // TODO: update

  const handleRecovery: SubmitHandler<PasswordRecoverySchema> = async user => {
    try {
      const res = await axios.post('/api/users/password/recover', user)
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
      onSubmit={handleSubmit(handleRecovery)}
      noValidate
      className={styles.root}
    >
      <LanguageMenu />
      <Typography className={styles.title} tag="h1" weight="semiBold">
        {t.auth('PasswordRecovery.title')}
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
          name="email"
          placeholder="email@domain.com"
          type="email"
          label={t.auth('email')}
          subLabel={{
            text: errors?.email?.message,
            isShown: fieldState.isTouched,
          }}
          testId="send-reset-password-email"
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
          testId="submit-send-reset-password-form"
          disabled={!isValid}
          isLoading={isSubmitting}
          type="submit"
        >
          {t.auth('PasswordRecovery.cta')}
        </Button>
      </div>

      <Link href="/login">{t.auth('PasswordRecovery.fallback')}</Link>
    </form>
  )
}

export default PasswordRecoveryForm
