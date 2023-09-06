import type { Meta, StoryObj } from '@storybook/react'

import { MainSelect } from '.'

const meta = {
  title: 'Components/Select',
  component: MainSelect,
  tags: ['autodocs'],
} satisfies Meta<typeof MainSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Select: Story = {
  args: {
    value: ['1', '2', '3'],
    defaultValue: '1',
  },
}
