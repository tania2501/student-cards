import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../ui/button'
import { ControlledCheckbox } from '../../ui/controlled/controlled-checkbox/controlled-checkbox'
import { Input } from '../../ui/input'

type FormValues = {
  email: string
  password: string
  rememberMe: boolean
}
const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(3, { message: 'Must be exactly 5 characters long' }),
  rememberMe: z.boolean().default(false),
})

export const LoginForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: FormValues) => {
    // eslint-disable-next-line no-console
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DevTool control={control} />
      <Input
        type="email"
        {...register('email')}
        label={'email'}
        errorMessage={errors.email?.message}
      />
      <Input
        type="password"
        {...register('password')}
        label={'password'}
        errorMessage={errors.password?.message}
      />
      <ControlledCheckbox label={'remember me'} control={control} name={'rememberMe'} />
      <Button type="submit">Submit</Button>
    </form>
  )
}