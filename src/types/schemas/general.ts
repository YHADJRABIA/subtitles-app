import { useTranslations } from 'next-intl'
import * as z from 'zod'

export type ValidFieldNames = 'email' | 'password' | 'token' | 'name'

export const emailSchema = (t: ReturnType<typeof useTranslations<'Zod'>>) =>
  z
    .string()
    .min(1, { message: t('email.missing') })
    .email({ message: t('email.invalid') })
    .max(255, { message: t('email.too_long') })
    .trim()
    .toLowerCase()

export const idSchema = (t: ReturnType<typeof useTranslations<'Zod'>>) =>
  z.string().min(1, { message: t('id.missing') })

export const passwordSchema = (t: ReturnType<typeof useTranslations<'Zod'>>) =>
  z
    .string()
    .min(6, { message: t('password.too_short') })
    .max(255, { message: t('password.too_long') })

export const tokenSchema = (t: ReturnType<typeof useTranslations<'Zod'>>) =>
  z.string().min(1, { message: t('token.missing') })

export const nameSchema = (t: ReturnType<typeof useTranslations<'Zod'>>) =>
  z
    .string()
    .min(1, { message: t('name.missing') })
    .max(40, { message: t('name.too_long') })
    .trim()

export const codeSchema = (t: ReturnType<typeof useTranslations<'Zod'>>) =>
  z
    .string()
    .min(4, { message: t('code.too_short') })
    .max(8, { message: t('code.too_long') })
    .trim()

export const SendEmailVerificationValidator = (
  t: ReturnType<typeof useTranslations<'Zod'>>
) => z.object({ email: emailSchema(t) })

export type SendEmailVerificationSchema = z.infer<
  ReturnType<typeof SendEmailVerificationValidator>
>
