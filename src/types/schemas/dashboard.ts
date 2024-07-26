import { useTranslations } from 'next-intl'
import * as z from 'zod'

export const idSchema = (t: ReturnType<typeof useTranslations<'Zod'>>) =>
  z.string().min(1, { message: t('id.missing') })

export const UserDeleteValidator = (
  t: ReturnType<typeof useTranslations<'Zod'>>
) => idSchema(t)

export type UserDeleteSchema = z.infer<ReturnType<typeof UserDeleteValidator>>
