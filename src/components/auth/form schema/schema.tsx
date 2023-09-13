import { z } from 'zod'

export const loginSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(3, { message: 'Must be exactly 5 characters long' }),
    confirmPassword: z.string().min(3, { message: 'Must be exactly 5 characters long' }),
    rememberMe: z.boolean().default(false),
    radio: z.union([z.enum(['yes', 'no']), z.null()]).nullable(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
