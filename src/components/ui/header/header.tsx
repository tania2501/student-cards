import { SvgLogo } from '../../../assets/icons/logo'
import { SvgAva, SvgOut } from '../../../assets/icons/menu-icons'
import ava from '../../../assets/IMG_20230424_174148.jpg'
import { Avatar } from '../avatar'
import { Button } from '../button'
import { DropDownMenu, MenuItemsType } from '../dropDownMenu'

import s from './header.module.scss'
type HeaderProps = {
  isAuth: boolean
  userInfo?: {
    name: string
    avatar?: string
    email: string
  } | null
  onSignOut?: () => void
}

export const Header = (props: HeaderProps) => {
  const menuItems: MenuItemsType[] = [
    {
      icon: <Avatar src={props.userInfo?.avatar || ''} />,
      text: props.userInfo?.name || 'Name',
      email: props.userInfo?.email || 'Email',
    },
    { icon: <SvgAva />, text: 'My Profile' },
    { icon: <SvgOut />, text: 'Log out' },
  ]

  return (
    <header className={s.header}>
      <div className={s.container}>
        <SvgLogo />
        {props.isAuth ? (
          <DropDownMenu items={menuItems} avatar={ava} />
        ) : (
          <Button as="a" href="/login">
            Sing In
          </Button>
        )}
      </div>
    </header>
  )
}
