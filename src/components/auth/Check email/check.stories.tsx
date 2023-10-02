import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { CheckEmail } from './check'

const meta = {
  title: 'Auth/CheckEmail',
  component: CheckEmail,
  tags: ['autodocs'],
  argTypes: {
    email: {
      control: {
        type: 'text',
      },
    },
  },
} satisfies Meta<typeof CheckEmail>

export default meta
type Story = StoryObj<typeof meta>
const Main = () => {
  return (
    <BrowserRouter>
      <CheckEmail email="myemail@.com" />
    </BrowserRouter>
  )
}

export const CheckEmailStory: Story = {
  render: () => <Main />,
  args: {
    email: 'myemail@.com',
  },
}
