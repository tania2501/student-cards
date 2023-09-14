import type { Meta, StoryObj } from '@storybook/react'

import ava from '../../../assets/IMG_20230424_174148.jpg'

import { Header } from '.'

const meta = {
  title: 'Layout/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const NotAuthorized: Story = {
  args: {
    isAuth: false,
  },
}

export const Authorized: Story = {
  args: {
    isAuth: true,
    userInfo: {
      name: 'Tania',
      avatar: ava,
      email: 'evdunova@mail.com',
    },
  },
}
