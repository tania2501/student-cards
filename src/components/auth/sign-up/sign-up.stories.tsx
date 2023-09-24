import type { Meta, StoryObj } from '@storybook/react'

import { SignUp } from './sign-up'

const meta = {
  title: 'Auth/SignUp',
  component: SignUp,
  tags: ['autodocs'],
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>

export const SignUpStory: Story = {
  args: {
    // eslint-disable-next-line no-console
    onSubmit: (data: any) => console.info(data),
  },
}
