import * as z from 'zod'

export type ValidFieldNames = 'email' /*  | 'password' */

export type AuthFormData = {
  email: string
}

export const PasswordRecoveryValidator = z.object({
  email: z
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
    .toLowerCase(),
})

export type PasswordRecoverySchema = z.infer<typeof PasswordRecoveryValidator>
