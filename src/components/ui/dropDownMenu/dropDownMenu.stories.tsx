import type { Meta, StoryObj } from '@storybook/react'

import { SvgAva } from '../../../assets/icons/menu-icons'

import { DropDownMenu, DropDownMenuItem } from '.'

import ava from '@/assets/logo.jpg'

const meta = {
  title: 'Components/DropDownMenu',
  component: DropDownMenu,
  tags: ['autodocs'],
} satisfies Meta<typeof DropDownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const DropDown: Story = {
  args: {
    info: {
      name: 'Tania',
      avatar: ava,
    },
    children: (
      <>
        <DropDownMenuItem>
          <SvgAva />
          <p>My profile</p>
        </DropDownMenuItem>
        <DropDownMenuItem>
          <SvgAva />
          <p>My text</p>
        </DropDownMenuItem>
      </>
    ),
  },
}
