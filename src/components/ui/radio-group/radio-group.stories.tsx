import type { Meta, StoryObj } from '@storybook/react'

import { CardsRadioGroup } from '.'

const meta = {
  title: 'Components/RadioGroup',
  component: CardsRadioGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof CardsRadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const RadioGroup: Story = {}
