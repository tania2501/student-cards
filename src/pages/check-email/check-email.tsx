import { useSearchParams } from 'react-router-dom'

import { CheckEmail } from '../../components/auth/Check email/check'

export const CheckEmailPage = () => {
  const [params] = useSearchParams()
  const email = params.get('email')

  return <CheckEmail email={email ?? ''} />
}
