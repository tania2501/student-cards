/* eslint-disable no-console */
import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { ForgotPassword } from './forgot'

const meta = {
  title: 'Auth/ForgotPassword',
  component: ForgotPassword,
  tags: ['autodocs'],
} satisfies Meta<typeof ForgotPassword>

export default meta
type Story = StoryObj<typeof meta>
const Main = () => {
  return (
    <BrowserRouter>
      <ForgotPassword onSubmit={data => console.info(data)} />
    </BrowserRouter>
  )
}

export const ForgotPasswordStory: Story = {
  render: () => <Main />,
  args: {
    onSubmit: (data: any) => console.info(data),
  },
}
