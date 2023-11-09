import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Layout } from './components/ui/header'
import { CardsPage } from './pages/card/cards'
import { LearnCard } from './pages/card/learn-card/learn-card'
import { CheckEmailPage } from './pages/check-email/check-email'
import { Decks } from './pages/decks/decks'
import { ForgotPasswordPage } from './pages/forgot-password/forgot-password'
import { LoginPage } from './pages/login'
import { Profile } from './pages/profile'
import { ResetPasswordPage } from './pages/reset-password/reset-password'
import { SignUpPage } from './pages/signup'
import { useGetMeQuery } from './services/auth/auth.service'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/check-email',
    element: <CheckEmailPage />,
  },
  {
    path: '/set-new-password/:token',
    element: <ResetPasswordPage />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={'/decks'} />,
  },
  {
    path: '/decks',
    element: <Decks />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/cards/:deckId',
    element: <CardsPage />,
  },
  {
    path: '/cards/learn/:deckId',
    element: <LearnCard />,
  },
]

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <PrivateRoutes />,
        children: privateRoutes,
      },
      ...publicRoutes,
    ],
  },
])

function PrivateRoutes() {
  const { data: me, isLoading: isMeLoading } = useGetMeQuery()
  const isAuthenticated = !!me

  if (isMeLoading) return <div>Loading...</div>

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export const Router = () => {
  return <RouterProvider router={router} />
}
