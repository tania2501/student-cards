import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { SignUp } from './sign-up'

const meta = {
  title: 'Auth/SignUp',
  component: SignUp,
  tags: ['autodocs'],
  argTypes: { onSubmit: { action: 'data' } },
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>
const Main = () => {
  return (
    <BrowserRouter>
      <SignUp onSubmit={() => {}} />
    </BrowserRouter>
  )
}

export const SignUpStory: Story = {
  render: () => <Main />,
  args: {},
}
