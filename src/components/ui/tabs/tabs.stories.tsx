import type { Meta, StoryObj } from '@storybook/react'

import { CardsTabs } from './'

const meta = {
  title: 'Components/CardsTabs',
  component: CardsTabs,
  tags: ['autodocs'],
} satisfies Meta<typeof CardsTabs>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    tabsTitle: ['1', '2'],
    myDecks: '12',
    usersDecks: 'user',
  },
}
