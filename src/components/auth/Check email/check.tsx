/* eslint-disable react/no-unescaped-entities */
import { FC } from 'react'

import clsx from 'clsx'
import { Link } from 'react-router-dom'

import { CheckEmailIcon } from '../../../assets/icons/check'
import { Button } from '../../ui/button'
import { Card } from '../../ui/card'
import { Typography } from '../../ui/typography'
import s from '../auth.module.scss'

type CheckEmailType = {
  email: string
}

export const CheckEmail: FC<CheckEmailType> = ({ email }) => {
  const classNames = {
    email: clsx(s.instructions, s.email),
  }

  return (
    <Card>
      <Typography variant="large" className={s.title}>
        Check your email
      </Typography>
      <div>
        <CheckEmailIcon />
      </div>
      <Typography variant="body2" className={classNames.email}>
        We've sent an e-mail with instructions to {email}
      </Typography>
      <Button as={Link} to="/login" variant="primary" fullWidth>
        Back to Sign in
      </Button>
    </Card>
  )
}
