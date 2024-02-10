import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { omit } from 'remeda'
import { z } from 'zod'

import { Button } from '../../ui/button'
import { Card } from '../../ui/card'
import { ControlledInput } from '../../ui/controlled/controlled-input'
import { Typography } from '../../ui/typography'
import s from '../auth.module.scss'

const loginSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(3, { message: 'Must be exactly 5 characters long' }),
    confirmPassword: z.string().min(3, { message: 'Must be exactly 5 characters long' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type FormData = z.infer<typeof loginSchema>
type SubmitProps = {
  onSubmit: (data: Omit<FormData, 'confirmPassword'>) => void
}
export const SignUp = (props: SubmitProps) => {
  const { control, handleSubmit } = useForm<FormData>({
    mode: 'onSubmit',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })
  const handleFormSubmitted = handleSubmit(data => props.onSubmit(omit(data, ['confirmPassword'])))

  return (
    <Card className={s.paper}>
      <Typography variant="large" className={s.title}>
        Sign Up
      </Typography>
      <form onSubmit={handleFormSubmitted}>
        <DevTool control={control} />
        <div className={s.inputs}>
          <ControlledInput
            control={control}
            name="email"
            label="Email"
            placeholder="Email"
            id="sing-up-email"
          />
          <ControlledInput
            id="sing-up-password"
            type="password"
            name="password"
            control={control}
            label="Password"
            placeholder="Password"
            autoComplete="on"
          />
          <ControlledInput
            id="confirm-password"
            type="password"
            name="confirmPassword"
            control={control}
            label="Confirm password"
            placeholder="Confirm password"
            autoComplete="on"
          />
        </div>
        <Button variant="primary" type="submit" fullWidth className={s.button}>
          Sign Up
        </Button>
      </form>
      <Typography variant="body2" className={s.text}>
        Already have an account?
      </Typography>
      <Typography as={Link} to="/login" variant="link1" className={s.Link}>
        Sign In
      </Typography>
    </Card>
  )
}
