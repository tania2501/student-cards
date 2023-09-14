/* eslint-disable react/no-unescaped-entities */
import clsx from 'clsx'

import { CheckEmailIcon } from '../../../assets/icons/check'
import { Button } from '../../ui/button'
import { Card } from '../../ui/card'
import { Typography } from '../../ui/typography'
import s from '../auth.module.scss'

export const CheckEmail = () => {
  const classNames = {
    email: clsx(s.instructions, s.email),
  }

  return (
    <Card className={s.paper}>
      <Typography variant="large" className={s.title}>
        Check your email
      </Typography>
      <div>
        <CheckEmailIcon />
      </div>
      <Typography variant="body2" className={classNames.email}>
        We've sent an e-mail with instructions to your_email@domain.com
      </Typography>
      <Button as="a" variant="primary" fullWidth>
        Back to Sign in
      </Button>
    </Card>
  )
}
