/* eslint-disable react/no-unescaped-entities */
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../ui/button'
import { Card } from '../../ui/card'
import { ControlledCheckbox } from '../../ui/controlled/controlled-checkbox/controlled-checkbox'
import { ControlledInput } from '../../ui/controlled/controlled-checkbox/controlled-input'
import { Typography } from '../../ui/typography'
import s from '../auth.module.scss'

export const SingIn = () => {
  const onSubmit = (data: FormValues) => {
    // eslint-disable-next-line no-console
    console.log(data)
  }

  return (
    <Card className={s.paper}>
      <Typography variant="large">Sing In</Typography>
      <SingInForm onSubmit={onSubmit} />
      <Typography variant="body2" className={s.text}>
        Don't have an account?
      </Typography>
      <Typography variant="link1" className={s.signUpLink}>
        Sign Up
      </Typography>
    </Card>
  )
}

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(3, { message: 'Must be exactly 5 characters long' }),
  rememberMe: z.boolean().default(false),
})

export type FormValues = z.infer<typeof loginSchema>
type SubmitProps = {
  onSubmit: (data: FormValues) => void
}
const SingInForm = (props: SubmitProps) => {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <DevTool control={control} />
      <div className={s.inputs}>
        <ControlledInput control={control} name="email" label="Email" placeholder="Email" />
        <ControlledInput
          name="password"
          control={control}
          label="Password"
          placeholder="Password"
        />
      </div>
      <ControlledCheckbox label={'remember me'} control={control} name={'rememberMe'} />
      <Typography variant="body2" className={s.forgot}>
        Forgot Password?
      </Typography>
      <Button variant="primary" type="submit" fullWidth>
        Sing In
      </Button>
    </form>
  )
}