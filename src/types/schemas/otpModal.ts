import { useTranslations } from 'next-intl'
import * as z from 'zod'
import { codeSchema } from './general'

export const OTPCodeValidator = (
  t: ReturnType<typeof useTranslations<'Zod'>>
) => z.object({ code: codeSchema(t) })

export type OTPCodeSchema = z.infer<ReturnType<typeof OTPCodeValidator>>
