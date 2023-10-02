import { useNavigate } from 'react-router-dom'

import { ForgotPassword } from '../../components/auth/forgot password/forgot'
import { useForgotPasswordMutation } from '../../services/auth/auth.service'
import { RecoverPassword } from '../../services/auth/types'

export const ForgotPasswordPage = () => {
  const [recover] = useForgotPasswordMutation()
  const navigate = useNavigate()
  const onSubmit = async (data: RecoverPassword) => {
    await recover(data)

    return navigate(`/check-email?email=${data.email}`)
  }

  return <ForgotPassword onSubmit={onSubmit} />
}
