import type { Meta, StoryObj } from '@storybook/react'

import { NewPassword } from './createNewPassword'

const meta = {
  title: 'Auth/NewPassword',
  component: NewPassword,
  tags: ['autodocs'],
} satisfies Meta<typeof NewPassword>

export default meta
type Story = StoryObj<typeof meta>

export const NewPasswordStory: Story = {
  args: {
    // eslint-disable-next-line no-console
    onSubmit: (data: any) => console.info(data),
  },
}
