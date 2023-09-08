import type { Meta, StoryObj } from '@storybook/react'

import { SvgAva, SvgOut } from '../../../assets/icons/menu-icons'

import { DropDownMenu } from '.'

const meta = {
  title: 'Components/DropDownMenu',
  component: DropDownMenu,
  tags: ['autodocs'],
} satisfies Meta<typeof DropDownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const DropDown: Story = {
  args: {
    items: [
      { icon: <SvgAva />, text: 'My Profile' },
      { icon: <SvgOut />, text: 'Log out' },
    ],
  },
}
