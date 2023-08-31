import type { Meta, StoryObj } from '@storybook/react'

import { CheckBox } from './'

const meta = {
  title: 'Components/CheckBox',
  component: CheckBox,
  tags: ['autodocs'],
} satisfies Meta<typeof CheckBox>

export default meta
type Story = StoryObj<typeof meta>

export const PrimaryCheckBox: Story = {}
