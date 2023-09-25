import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { SignIn } from '../../components/auth/sign-in/sign-in'
import { useGetMeQuery, useLoginMutation } from '../../services/auth/auth.service'

export const LoginPage = () => {
  const [login] = useLoginMutation()
  const { data: me } = useGetMeQuery()

  const navigate = useNavigate()

  useEffect(() => {
    if (!me) return

    navigate('/')
  }, [me])

  return <SignIn onSubmit={login} />
}
