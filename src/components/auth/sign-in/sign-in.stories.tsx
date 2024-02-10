import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { SignIn } from './sign-in'

const meta = {
  title: 'Auth/SignIn',
  component: SignIn,
  tags: ['autodocs'],
  argTypes: { onSubmit: { action: 'data' } },
} satisfies Meta<typeof SignIn>

export default meta
type Story = StoryObj<typeof meta>
const Main = () => {
  return (
    <BrowserRouter>
      <SignIn onSubmit={() => {}} />
    </BrowserRouter>
  )
}

export const SignInStory: Story = {
  render: () => <Main />,
  args: {},
}
