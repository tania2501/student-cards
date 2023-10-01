import { FC } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { SvgLogo } from '../../../assets/icons/logo'
import { SvgAva, SvgOut } from '../../../assets/icons/menu-icons'
import ava from '../../../assets/logo.jpg'
import { Avatar } from '../avatar'
import { Button } from '../button'
import { DropDownMenu, DropDownMenuItem } from '../dropDownMenu'
import { Typography } from '../typography'

import s from './header.module.scss'
type HeaderType = {
  isAuth?: boolean
  logOut?: () => void
  userInfo?: {
    avatar?: string
    name: string
    email?: string
  } | null
}

export const Header: FC<HeaderType> = ({ isAuth, logOut, userInfo }) => {
  const navigate = useNavigate()

  return (
    <header className={s.header}>
      <div className={s.container}>
        <SvgLogo />
        {isAuth ? (
          <DropDownMenu userInfo={userInfo} avatar={userInfo?.avatar ?? ava}>
            <DropDownMenuItem>
              <div className={s.menuItem}>
                <Avatar src={userInfo?.avatar ?? ava} />
                <div>
                  <Typography as={'p'} variant={'subtitle2'}>
                    {userInfo?.name}
                  </Typography>
                  <Typography as={'p'} variant={'caption'} className={s.email}>
                    {userInfo?.email}
                  </Typography>
                </div>
              </div>
            </DropDownMenuItem>
            <DropDownMenuItem onClick={() => navigate('/profile')}>
              <div className={s.menuItem}>
                <SvgAva />
                <p>My profile</p>
              </div>
            </DropDownMenuItem>
            <DropDownMenuItem onClick={logOut}>
              <div className={s.menuItem}>
                <SvgOut />
                <p>Log out</p>
              </div>
            </DropDownMenuItem>
          </DropDownMenu>
        ) : (
          <Button as={Link} to="/login">
            Sign In
          </Button>
        )}
      </div>
    </header>
  )
}
