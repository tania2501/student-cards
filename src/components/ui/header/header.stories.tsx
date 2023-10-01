import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { Header } from './header'

const meta = {
  title: 'Layout/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

const Auth = () => {
  return (
    <BrowserRouter>
      <Header isAuth={true} userInfo={{ name: 'Tania' }} />
    </BrowserRouter>
  )
}
const NotAuth = () => {
  return (
    <BrowserRouter>
      <Header isAuth={false} />
    </BrowserRouter>
  )
}

export const NotAuthorized: Story = {
  render: () => <Auth />,
}

export const Authorized: Story = {
  render: () => <NotAuth />,
}
