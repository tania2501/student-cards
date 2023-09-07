import type { Meta, StoryObj } from '@storybook/react'

import { Pagination } from '.'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    contentPerPage: {
      control: { type: 'number' },
    },
    count: {
      control: { type: 'number' },
    },
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const CardsPagination: Story = {
  args: {
    contentPerPage: 1,
    count: 12,
  },
}
