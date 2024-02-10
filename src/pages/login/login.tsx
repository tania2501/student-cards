import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { SignIn } from '../../components/auth/sign-in/sign-in'
import { useGetMeQuery, useLoginMutation } from '../../services/auth/auth.service'
import { LoginType } from '../../services/auth/types'

export const LoginPage = () => {
  const [login] = useLoginMutation()
  const { data } = useGetMeQuery()
  const navigate = useNavigate()

  if (data && !('success' in data)) return <Navigate to={'/decks'} />

  const handleLogin = async (args: LoginType) => {
    try {
      await login(args).unwrap()
      toast.success('Successfully Login')
      navigate('/decks')
    } catch (e: any) {
      return toast.error(e.data.message)
    }
  }

  return <SignIn onSubmit={handleLogin} />
}
