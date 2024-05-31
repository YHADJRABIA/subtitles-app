import * as z from 'zod'

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
      message: 'Email is too long',
    })
    .trim()
    .toLowerCase(),
})

export type PasswordRecoverySchema = z.infer<typeof PasswordRecoveryValidator>
