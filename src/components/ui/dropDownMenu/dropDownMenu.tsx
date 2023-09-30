import { FC, ReactNode, useState } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { Avatar } from '../avatar'
import { Typography } from '../typography'

import s from './dropDownMenu.module.scss'

export type MenuItemsType = {
  icon: JSX.Element
  text: string
  email?: string
}
type DropDownType = {
  avatar?: string
  userInfo?: {
    name: string
    avatar?: string
    email?: string
  } | null
  onClick?: () => void
  children?: ReactNode
}
export const DropDownMenu: FC<DropDownType> = ({ userInfo, avatar, children }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className={s.main}>
      <DropdownMenu.Root open={open} onOpenChange={setOpen}>
        <DropdownMenu.Trigger>
          <button className={s.IconButton} aria-label="Customize options">
            <Typography variant="subtitle">{userInfo?.name}</Typography>
            <Avatar src={avatar ? avatar : ''} />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className={s.DropdownMenuContent} sideOffset={5}>
            {open && (
              <>
                <DropdownMenu.Arrow className={s.MenuArrow} />
                <div>{children}</div>
              </>
            )}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}

export const DropDownMenuItem: FC<DropdownMenu.DropdownMenuProps> = ({ children, ...props }) => {
  return (
    <DropdownMenu.Item className={s.DropdownMenuItem} {...props}>
      <div className={s.DropdownMenuItem}>{children}</div>
    </DropdownMenu.Item>
  )
}
