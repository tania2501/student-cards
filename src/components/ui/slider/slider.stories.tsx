import type { Meta, StoryObj } from '@storybook/react'

import { MainSlider } from '.'

const meta = {
  title: 'Components/Slider',
  component: MainSlider,
  tags: ['autodocs'],
} satisfies Meta<typeof MainSlider>

export default meta
type Story = StoryObj<typeof meta>

export const Slider: Story = {
  args: {
    value: [2, 8],
    max: 15,
  },
}
