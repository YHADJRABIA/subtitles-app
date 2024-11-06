import { useTranslations } from 'next-intl'
import * as z from 'zod'

export const idSchema = (t: ReturnType<typeof useTranslations<'Zod'>>) =>
  z.string().min(1, { message: t('id.missing') })

export const UserDeleteValidator = (
  t: ReturnType<typeof useTranslations<'Zod'>>
) => idSchema(t)

export type UserDeleteSchema = z.infer<ReturnType<typeof UserDeleteValidator>>

export const UserUpdateValidator = (
  t: ReturnType<typeof useTranslations<'Zod'>>
) =>
  z.object({
    id: idSchema(t),
    user: z.object({
      name: z.string().min(1, { message: t('name.missing') }),
      email: z
        .string()
        .email({ message: t('email.invalid') })
        .toLowerCase(),
      // Add other fields as needed
    }), //.partial(),
  })

export type UserUpdateSchema = z.infer<ReturnType<typeof UserUpdateValidator>>
