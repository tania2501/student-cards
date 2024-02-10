import { FC, ReactNode, useState } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { Avatar } from '../avatar'
import { Typography } from '../typography'

import s from './dropDownMenu.module.scss'

import ava from '@/assets/logo.jpg'

type DropDownType = {
  icon?: JSX.Element
  info?: {
    name: string
    avatar?: string
    email?: string
  } | null
  onClick?: () => void
  children?: ReactNode
}
export const DropDownMenu: FC<DropDownType> = ({ info, children, icon }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className={s.main}>
      <DropdownMenu.Root open={open} onOpenChange={setOpen}>
        <DropdownMenu.Trigger asChild>
          <button className={s.IconButton} aria-label="Customize options">
            {info && <Typography variant="subtitle">{info?.name}</Typography>}
            {info ? <Avatar src={info ? info.avatar : ava} /> : icon}
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content align="end" className={s.DropdownMenuContent} sideOffset={5}>
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
