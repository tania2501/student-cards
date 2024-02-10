import { Outlet } from 'react-router-dom'

import { useGetMeQuery, useLogOutMutation } from '../../../services/auth/auth.service'

import { Header } from './header'

export const Layout = () => {
  const { data: me } = useGetMeQuery()
  const [logOut] = useLogOutMutation()
  const isAuth = !!me

  return (
    <div>
      <Header isAuth={isAuth} userInfo={me} logOut={logOut} />
      <Outlet />
    </div>
  )
}
