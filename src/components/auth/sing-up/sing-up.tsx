/* eslint-disable react/no-unescaped-entities */
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../ui/button'
import { Card } from '../../ui/card'
import { ControlledInput } from '../../ui/controlled/controlled-checkbox/controlled-input'
import { Typography } from '../../ui/typography'
import s from '../auth.module.scss'

export const SingUp = () => {
  const onSubmit = (data: SingUpFormValues) => {
    // eslint-disable-next-line no-console
    console.log(data)
  }

  return (
    <Card className={s.paper}>
      <Typography variant="large">Sing Up</Typography>
      <SingInForm onSubmit={onSubmit} />
      <Typography variant="body2" className={s.text}>
        Already have an account?
      </Typography>
      <Typography variant="link1" className={s.Link}>
        Sign In
      </Typography>
    </Card>
  )
}

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

export type SingUpFormValues = z.infer<typeof loginSchema>
type SubmitProps = {
  onSubmit: (data: SingUpFormValues) => void
}
const SingInForm = (props: SubmitProps) => {
  const { control, handleSubmit } = useForm<SingUpFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
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
        Sing Up
      </Button>
    </form>
  )
}
