import { SignUp } from '../../components/auth/sign-up/sign-up'
import { useSignUpMutation } from '../../services/auth/auth.service'

export const SingUpPage = () => {
  const [singUp] = useSignUpMutation()

  return <SignUp onSubmit={singUp} />
}
