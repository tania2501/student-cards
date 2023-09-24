import { SignIn } from '../../components/auth/sign-in/sign-in'
import { useLoginMutation } from '../../services/auth/auth.service'

export const LoginPage = () => {
  const [login] = useLoginMutation()

  return <SignIn onSubmit={login} />
}
