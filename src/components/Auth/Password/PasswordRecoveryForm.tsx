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
import { Link } from '@/lib/i18n/navigation'

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

  const InfoIcon = info.type === 'error' ? ErrorIcon : EmailSentIcon // TODO: update

  const handleRecovery: SubmitHandler<PasswordRecoverySchema> = async user => {
    try {
      const res = await handleSendPasswordRecoveryEmail(user)
      setInfoMessage(res.data.message, 'success')
    } catch (err) {
      setInfoMessage(getErrorMessage(err), 'error')
    }
  }

  return (
    <form
      method="POST"
      onSubmit={handleSubmit(handleRecovery)}
      noValidate
      className={styles.root}
    >
      <div className={styles.wrapper}>
        <Typography className={styles.title} tag="h1" weight="semiBold">
          {t('PasswordRecovery.title')}
        </Typography>
        <TextInBox
          className={styles.infoBox}
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
          label={t('email')}
          subLabel={{
            text: errors?.email?.message,
            isShown: fieldState.isTouched,
          }}
          testId="send-reset-password-email"
          leftIcon={{ src: EmailIcon, title: t('email') }}
        />

        <Button
          className={styles.cta}
          variation="primary"
          testId="submit-send-reset-password-form"
          disabled={!isValid}
          isLoading={isSubmitting}
          type="submit"
          weight="semiBold"
          size="xs"
        >
          {t('PasswordRecovery.cta')}
        </Button>
      </div>

      <Typography>
        {t.rich('PasswordRecovery.fallback', {
          login: text => <Link href={'/login'}>{text}</Link>,
          register: text => <Link href={'/register'}>{text}</Link>,
        })}
      </Typography>
    </form>
  )
}

export default PasswordRecoveryForm
