import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '../../ui/button'
import { Card } from '../../ui/card'
import { ControlledInput } from '../../ui/controlled/controlled-checkbox/controlled-input'
import { Typography } from '../../ui/typography'
import s from '../auth.module.scss'

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})

type FormData = z.infer<typeof loginSchema>
type SubmitProps = {
  onSubmit: (data: FormData) => void
}

export const ForgotPassword = (props: SubmitProps) => {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
    },
  })

  return (
    <Card>
      <Typography variant="large" className={s.title}>
        Forgot your password?
      </Typography>
      <form onSubmit={handleSubmit(props.onSubmit)}>
        <ControlledInput
          control={control}
          name="email"
          label="Email"
          placeholder="Email"
          id="forgot-email"
        />
        <Typography as="p" variant="body2" className={s.instructions}>
          Enter your email address and we will send you further instructions
        </Typography>
        <Button variant="primary" type="submit" className={s.button} fullWidth>
          Send instructions
        </Button>
      </form>
      <Typography variant="body2" className={s.text}>
        Did you remember your password?
      </Typography>
      <Typography as={Link} to="/login" variant="link1" className={s.Link}>
        Try logging in
      </Typography>
    </Card>
  )
}
