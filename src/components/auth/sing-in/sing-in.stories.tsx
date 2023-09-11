import type { Meta, StoryObj } from '@storybook/react'

import { FormValues, SingIn } from './sing-in'

const meta = {
  title: 'Auth/SingIn',
  component: SingIn,
  tags: ['autodocs'],
} satisfies Meta<typeof SingIn>

export default meta
type Story = StoryObj<typeof meta>

export const SingInStory: Story = {
  args: {
    // eslint-disable-next-line no-console
    onSubmit: (data: FormValues) => console.info(data),
  },
}
