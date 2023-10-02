import { useNavigate, useParams } from 'react-router-dom'

import { NewPassword } from '../../components/auth/create new password/createNewPassword'
import { useResetPasswordMutation } from '../../services/auth/auth.service'
import { ResetPassword } from '../../services/auth/types'

export const ResetPasswordPage = () => {
  const navigate = useNavigate()
  const { token } = useParams()
  const [reset] = useResetPasswordMutation()
  const onSubmit = (data: ResetPassword) => {
    reset({ token: token, password: data.password }).then(() => navigate('/login'))
  }

  return <NewPassword onSubmit={onSubmit} />
}
