import * as z from 'zod'

export type ValidFieldNames = 'email' | 'password'

export type AuthFormData = {
  email: string
  password: string
}

const emailSchema = z
  .string()
  .min(1, {
    message: 'Missing email',
  })
  .email({
    message: 'Invalid email format',
  })
  .max(255, {
    message: 'Email is too long. Max 255 characters',
  })
  .trim()
  .toLowerCase()

export const PasswordRecoveryValidator = z.object({ email: emailSchema })

export type PasswordRecoverySchema = z.infer<typeof PasswordRecoveryValidator>

export const AccountRegistrationValidator = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(6, { message: 'Password must contain at least 6 characters' })
    .max(255, {
      message: 'Password is too long. Max 255 characters',
    }),
})

export type AccountRegistrationSchema = z.infer<
  typeof AccountRegistrationValidator
>

export const AccountLoginValidator = z.object({
  email: emailSchema,
  password: z.string().min(1, { message: 'Missing password' }),
})

export type AccountLoginSchema = z.infer<typeof AccountRegistrationValidator>

export const AccountEmailVerificationValidator = z.object({
  email: emailSchema,
})

export type AccountEmailVerificationSchema = z.infer<
  typeof AccountEmailVerificationValidator
>
