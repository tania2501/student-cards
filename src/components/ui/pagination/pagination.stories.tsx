import { useState } from 'react'

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
    currentPage: {
      control: { type: 'number' },
    },
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

const PaginationWithArgs = () => {
  const [page, setPage] = useState<number>(1)

  return <Pagination contentPerPage={1} count={22} currentPage={page} setCurrentPage={setPage} />
}

export const CardsPagination: Story = {
  render: () => <PaginationWithArgs />,

  args: {
    contentPerPage: 1,
    count: 20,
    currentPage: 1,
    setCurrentPage: page => page,
  },
}
