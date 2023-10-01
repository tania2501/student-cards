import { FC, ReactNode, useState } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { Avatar } from '../avatar'
import { Typography } from '../typography'

import s from './dropDownMenu.module.scss'

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
        <DropdownMenu.Trigger asChild>
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

type DropDownItem = DropdownMenu.DropdownMenuItemProps & {
  onClickItem?: () => void
}

export const DropDownMenuItem: FC<DropDownItem> = ({ children, onClickItem, ...props }) => {
  return (
    <DropdownMenu.Item className={s.DropdownMenuItem} onClick={onClickItem} {...props}>
      <div className={s.DropdownMenuItem}>{children}</div>
    </DropdownMenu.Item>
  )
}
