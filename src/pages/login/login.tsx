import { SingIn } from '../../components/auth/sing-in/sing-in'
import { useLoginMutation } from '../../services/auth/auth.service'

export const LoginPage = () => {
  const [login] = useLoginMutation()

  return <SingIn onSubmit={login} />
}
