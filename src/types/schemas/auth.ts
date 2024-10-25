import { useTranslations } from 'next-intl'
import * as z from 'zod'

export type ValidFieldNames = 'email' | 'password' | 'token'

export type AuthFormData = {
  email: string
  password: string
}

const emailSchema = (t: ReturnType<typeof useTranslations<'Zod.email'>>) =>
  z
    .string()
    .min(1, {
      message: t('missing'),
    })
    .email({
      message: t('invalid'),
    })
    .max(255, {
      message: t('too_long'),
    })
    .trim()
    .toLowerCase()

const passwordSchema = (
  t: ReturnType<typeof useTranslations<'Zod.password'>>
) =>
  z
    .string()
    .min(6, { message: t('too_short') })
    .max(255, { message: t('too_long') })

const tokenSchema = (t: ReturnType<typeof useTranslations<'Zod.token'>>) =>
  z.string().min(1, { message: t('missing') })

export const AccountRegistrationValidator = (
  t: ReturnType<typeof useTranslations<'Zod'>>
) =>
  z.object({
    email: emailSchema(t),
    password: passwordSchema(t),
  })

export type AccountRegistrationSchema = z.infer<
  ReturnType<typeof AccountRegistrationValidator>
>

export const AccountLoginValidator = (
  t: ReturnType<typeof useTranslations<'Zod.password'>>
) =>
  z.object({
    email: emailSchema(t),
    password: z.string().min(1, { message: t('missing') }),
  })

export type AccountLoginSchema = z.infer<
  ReturnType<typeof AccountLoginValidator>
>

export const SendEmailVerificationValidator = (
  t: ReturnType<typeof useTranslations<'Zod'>>
) =>
  z.object({
    email: emailSchema(t),
  })

export type SendEmailVerificationSchema = z.infer<
  ReturnType<typeof SendEmailVerificationValidator>
>

export const EmailVerificationValidator = (
  t: ReturnType<typeof useTranslations<'Zod'>>
) =>
  z.object({
    token: tokenSchema(t),
  })

export type EmailVerificationSchema = z.infer<
  ReturnType<typeof EmailVerificationValidator>
>

export const PasswordRecoveryValidator = (
  t: ReturnType<typeof useTranslations<'Zod'>>
) => z.object({ email: emailSchema(t) })

export type PasswordRecoverySchema = z.infer<
  ReturnType<typeof PasswordRecoveryValidator>
>

export const PasswordResetValidator = (
  t: ReturnType<typeof useTranslations<'Zod'>>
) =>
  z.object({
    password: passwordSchema(t),
    token: tokenSchema(t),
  })

export type PasswordResetSchema = z.infer<
  ReturnType<typeof PasswordResetValidator>
>
