import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Pagination } from '.'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: {
    contentPerPage: 1,
    count: 22,
    page: 1,
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

const PaginationWithArgs = () => {
  const [page, setPage] = useState<number>(1)

  return <Pagination contentPerPage={1} count={22} page={page} setPage={setPage} />
}

export const CardsPagination: Story = {
  args: {},
  render: () => <PaginationWithArgs />,
}
