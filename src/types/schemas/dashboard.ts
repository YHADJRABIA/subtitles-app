import { useTranslations } from 'next-intl'
import * as z from 'zod'
import { emailSchema, idSchema, nameSchema } from './general'

export const UserDeleteValidator = (
  t: ReturnType<typeof useTranslations<'Zod'>>
) => idSchema(t)

export type UserDeleteSchema = z.infer<ReturnType<typeof UserDeleteValidator>>

export const DashboardUserValidator = (
  t: ReturnType<typeof useTranslations<'Zod'>>
) =>
  z.object({
    id: idSchema(t),
    user: z
      .object({
        name: nameSchema(t),
        email: emailSchema(t),
        // Add other fields as needed
      })
      .partial(),
  })
