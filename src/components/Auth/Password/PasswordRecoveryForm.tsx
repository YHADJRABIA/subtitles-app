'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { MdAlternateEmail as EmailIcon } from 'react-icons/md'

import {
  BsSendCheck as EmailSentIcon,
  BsXCircle as ErrorIcon,
} from 'react-icons/bs'

import styles from './PasswordRecoveryForm.module.scss'
import { Button } from '@/components/UI/Button'

import Field from '@/components/Forms/Field'

import { getErrorMessage } from '@/utils/errors'

import TextInBox from '@/components/TextInBox'
import Typography from '@/components/UI/Typography'
import {
  PasswordRecoveryValidator,
  PasswordRecoverySchema,
} from '@/types/schemas/auth'
import { SubmitHandler, useForm } from 'react-hook-form'
import useInfo from '@/hooks/useInfo'
import { useTranslations } from 'next-intl'
import { handleSendPasswordRecoveryEmail } from '@/actions/auth'
import { Link } from '@/i18n/routing'
import { getSuccessMessage } from '@/utils/api'
import { routes } from '@/routes/routes'

const PasswordRecoveryForm = () => {
  const searchParams = useSearchParams()
  const [t, t_zod] = [useTranslations('Auth'), useTranslations('Zod')]
  const queryParamEmail = searchParams.get('email') ?? ''

  const { info, setInfoMessage } = useInfo()

  const {
    register,
    getFieldState,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<PasswordRecoverySchema>({
    resolver: zodResolver(PasswordRecoveryValidator(t_zod)),
    defaultValues: { email: queryParamEmail },
    delayError: 400,
    mode: 'onChange',
  })

  const fieldState = getFieldState('email')

  const isError = info.type === 'error'

  const InfoIcon = isError ? ErrorIcon : EmailSentIcon

  const handleRecovery: SubmitHandler<PasswordRecoverySchema> = async user => {
    try {
      const res = await handleSendPasswordRecoveryEmail(user)
      setInfoMessage(getSuccessMessage(res), 'success')
    } catch (err) {
      setInfoMessage(await getErrorMessage(err), 'error')
    }
  }

  return (
    <form
      noValidate
      className={styles.root}
      method="POST"
      onSubmit={handleSubmit(handleRecovery)}
    >
      <div className={styles.wrapper}>
        <Typography className={styles.title} tag="h1" weight="semiBold">
          {t('PasswordRecovery.title')}
        </Typography>
        <TextInBox
          className={styles.infoBox}
          icon={InfoIcon}
          isShown={!!info.label}
          label={info.label}
          type={info.type}
        />
        <Field
          autoFocus
          className={styles.field}
          label={t('email')}
          leftIcon={{ src: EmailIcon, title: t('email') }}
          name="email"
          placeholder="email@domain.com"
          register={register}
          subLabel={{
            text: errors?.email?.message,
            isShown: fieldState.isTouched,
          }}
          testId="send-reset-password-email"
          type="email"
        />

        <Button
          className={styles.cta}
          disabled={!isValid}
          isLoading={isSubmitting}
          size="xs"
          testId="submit-send-reset-password-form"
          type="submit"
          variation="primary"
          weight="semiBold"
        >
          {t('PasswordRecovery.cta')}
        </Button>
      </div>

      <Typography align="center">
        {t.rich('PasswordRecovery.fallback', {
          login: text => <Link href={routes['/login']}>{text}</Link>,
          register: text => <Link href={routes['/register']}>{text}</Link>,
        })}
      </Typography>
    </form>
  )
}

export default PasswordRecoveryForm
