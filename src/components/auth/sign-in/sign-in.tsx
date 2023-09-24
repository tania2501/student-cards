/* eslint-disable react/no-unescaped-entities */
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '../../ui/button'
import { Card } from '../../ui/card'
import { ControlledCheckbox } from '../../ui/controlled/controlled-checkbox/controlled-checkbox'
import { ControlledInput } from '../../ui/controlled/controlled-checkbox/controlled-input'
import { Typography } from '../../ui/typography'
import s from '../auth.module.scss'

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(3, { message: 'Must be exactly 5 characters long' }),
  rememberMe: z.boolean().default(false),
})

type FormData = z.infer<typeof loginSchema>
type SubmitProps = {
  onSubmit: (data: FormData) => void
}
export const SignIn = (props: SubmitProps) => {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  return (
    <Card className={s.paper}>
      <Typography variant="large" className={s.title}>
        Sing In
      </Typography>
      <form onSubmit={handleSubmit(props.onSubmit)}>
        <DevTool control={control} />
        <div className={s.inputs}>
          <ControlledInput
            control={control}
            name="email"
            label="Email"
            placeholder="Email"
            id="sing-in-email"
          />
          <ControlledInput
            id="sing-in-passwoprd"
            type="password"
            name="password"
            control={control}
            label="Password"
            placeholder="Password"
            autoComplete="on"
          />
        </div>
        <ControlledCheckbox label={'remember me'} control={control} name={'rememberMe'} />
        <Typography as={Link} to="/forgot-password" variant="body2" className={s.forgot}>
          Forgot Password?
        </Typography>
        <Button variant="primary" type="submit" fullWidth>
          Sing In
        </Button>
      </form>
      <Typography variant="body2" className={s.text}>
        Don't have an account?
      </Typography>
      <Typography as={Link} to={'/singup'} variant="link1" className={s.Link}>
        Sign Up
      </Typography>
    </Card>
  )
}
