import type { Meta, StoryObj } from '@storybook/react'

import { SingUp } from './sing-up'

const meta = {
  title: 'Auth/SingUp',
  component: SingUp,
  tags: ['autodocs'],
} satisfies Meta<typeof SingUp>

export default meta
type Story = StoryObj<typeof meta>

export const SingUpStory: Story = {
  args: {
    // eslint-disable-next-line no-console
    onSubmit: (data: any) => console.info(data),
  },
}
