import { useState } from 'react'

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
  items: MenuItemsType[]
  avatar?: string
  userInfo?: {
    name: string
    avatar?: string
    email?: string
  } | null
}
export const DropDownMenu = (props: DropDownType) => {
  const [open, setOpen] = useState(false)

  return (
    <div className={s.main}>
      <DropdownMenu.Root open={open} onOpenChange={setOpen}>
        <DropdownMenu.Trigger asChild>
          <button className={s.IconButton} aria-label="Customize options">
            <Typography variant="subtitle">{props.userInfo?.name}</Typography>
            <Avatar src={props.avatar ? props.avatar : ''} />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className={s.DropdownMenuContent} sideOffset={5}>
            {open &&
              props.items.map((el, i) => {
                return (
                  <DropdownMenu.Item className={s.DropdownMenuItem} key={i}>
                    <div>{el.icon}</div>
                    <Typography as="div" variant="caption">
                      <p>{el.text}</p>
                      {el.email && <p className={s.email}>{el.email}</p>}
                    </Typography>
                  </DropdownMenu.Item>
                )
              })}
            <DropdownMenu.Arrow className={s.MenuArrow}>
              <div className={s.arrow} />
            </DropdownMenu.Arrow>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}
