import type { Meta, StoryObj } from '@storybook/react'

import { ForgotPassword } from './forgot'

const meta = {
  title: 'Auth/ForgotPassword',
  component: ForgotPassword,
  tags: ['autodocs'],
} satisfies Meta<typeof ForgotPassword>

export default meta
type Story = StoryObj<typeof meta>

export const ForgotPasswordStory: Story = {
  args: {
    // eslint-disable-next-line no-console
    onSubmit: (data: any) => console.info(data),
  },
}
