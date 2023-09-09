import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../ui/button'
import { ControlledCheckbox } from '../../ui/controlled/controlled-checkbox/controlled-checkbox'
import { ControlledInput } from '../../ui/controlled/controlled-checkbox/controlled-input'
import { ControlledRadioGroup } from '../../ui/controlled/controlled-checkbox/controlled-radio-group'
import { Option } from '../../ui/radio-group'

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(3, { message: 'Must be exactly 5 characters long' }),
  rememberMe: z.boolean().default(false),
  radio: z.union([z.enum(['yes', 'no']), z.null()]).nullable(),
})

export type FormValues = z.infer<typeof loginSchema>
type LoginFormType = {
  options: Option[]
}
export const LoginForm = (props: LoginFormType) => {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
      radio: null,
    },
  })

  const onSubmit = (data: FormValues) => {
    // eslint-disable-next-line no-console
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DevTool control={control} />
      <ControlledInput control={control} name="email" label="Email" />
      <ControlledInput name="password" control={control} label="Password" />
      <ControlledCheckbox label={'remember me'} control={control} name={'rememberMe'} />
      <ControlledRadioGroup control={control} name={'radio'} options={props.options} />
      <Button type="submit">Submit</Button>
    </form>
  )
}
