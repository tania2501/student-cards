import * as Tabs from '@radix-ui/react-tabs'
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
    tabsTitle: ['My tabs', 'Users tabs'],
    defaultValue: 'My tabs',
    setShow: show => !show,
    show: false,
    children: (
      <>
        <Tabs.Content value="My tabs">My content</Tabs.Content>
        <Tabs.Content value="Users tabs">Users content</Tabs.Content>
      </>
    ),
  },
}
