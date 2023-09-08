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
}
export const DropDownMenu = (props: DropDownType) => {
  const [open, setOpen] = useState(false)

  return (
    <div className={s.main}>
      <DropdownMenu.Root open={open} onOpenChange={setOpen}>
        <DropdownMenu.Trigger asChild>
          <button className={s.IconButton} aria-label="Customise options">
            <Avatar
              src={
                'https://png2.cleanpng.com/sh/a763c2aa5f08b95da4bc5c15cfb8c7c8/L0KzQYm4UcI5N6V3epH0aYP2gLBuTf5qdptmReJ4coTkcr3sTf5mfKh0it02Z4LkgLnwgCMua5DyiOd9ZYKwebT2jwMuaadmRd9qY33kc77og702apdqeaYEY0fnQYrrUL4xOWc3S6U6NkG4RIS7UcQ6PGE6SaQ9LoDxd1==/kisspng-ninja-portable-network-graphics-computer-icons-ava-macmacmac-5bfea49c7d19d0.0162331615434149405124.png'
              }
            />
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
