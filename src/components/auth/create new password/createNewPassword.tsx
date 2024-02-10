import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../ui/button'
import { Card } from '../../ui/card'
import { ControlledInput } from '../../ui/controlled/controlled-input'
import { Typography } from '../../ui/typography'
import s from '../auth.module.scss'

const loginSchema = z.object({
  password: z.string().min(3, { message: 'Must be exactly 5 characters long' }),
})

type FormData = z.infer<typeof loginSchema>
type SubmitProps = {
  onSubmit: (data: FormData) => void
}

export const NewPassword = (props: SubmitProps) => {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: '',
    },
  })

  return (
    <Card>
      <Typography variant="large" className={s.title}>
        Create new password
      </Typography>
      <form onSubmit={handleSubmit(props.onSubmit)}>
        <ControlledInput
          control={control}
          name="password"
          label="Password"
          placeholder="Password"
          id="new-password"
        />
        <Typography as="p" variant="caption" className={s.instructions}>
          Create new password and we will send you further instructions to email
        </Typography>
        <Button variant="primary" type="submit" className={s.button} fullWidth>
          Create new password
        </Button>
      </form>
    </Card>
  )
}
