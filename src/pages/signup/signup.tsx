import { SignUp } from '../../components/auth/sign-up/sign-up'
import { useSignUpMutation } from '../../services/auth/auth.service'

export const SignUpPage = () => {
  const [signUp] = useSignUpMutation()

  return <SignUp onSubmit={signUp} />
}
