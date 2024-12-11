import { useTranslations } from 'next-intl'
import * as z from 'zod'
import { codeSchema, emailSchema, idSchema, nameSchema } from './general'

export const UserDeleteValidator = (
  t: ReturnType<typeof useTranslations<'Zod'>>
) => idSchema(t)

export type UserDeleteSchema = z.infer<ReturnType<typeof UserDeleteValidator>>

const createUserSchema = (t: ReturnType<typeof useTranslations<'Zod'>>) => {
  return {
    name: nameSchema(t),
    email: emailSchema(t),
  }
}

export const DashboardUserValidator = (
  t: ReturnType<typeof useTranslations<'Zod'>>
) =>
  z.object({
    id: idSchema(t),
    user: z.object(createUserSchema(t)).partial(),
  })

export type DashboardUserSchema = z.infer<
  ReturnType<typeof DashboardUserValidator>
>

export const UserInfoValidator = (
  t: ReturnType<typeof useTranslations<'Zod'>>
) => z.object(createUserSchema(t)).partial()

export type UserInfoSchema = z.infer<ReturnType<typeof UserInfoValidator>>

export const SendEmailUpdateVerificationValidator = (
  t: ReturnType<typeof useTranslations<'Zod'>>
) =>
  z.object({
    email: emailSchema(t),
    userId: idSchema(t),
  })

export type SendEmailVerificationSchema = z.infer<
  ReturnType<typeof SendEmailUpdateVerificationValidator>
>

export const EmailVerificationByCodeValidator = (
  t: ReturnType<typeof useTranslations<'Zod'>>
) => z.object({ code: codeSchema(t) })

export type EmailVerificationByCodeSchema = z.infer<
  ReturnType<typeof EmailVerificationByCodeValidator>
>
