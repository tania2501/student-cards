import { SvgLogo } from '../../../assets/icons/logo'
import { SvgAva, SvgOut } from '../../../assets/icons/menu-icons'
import ava from '../../../assets/IMG_20230424_174148.jpg'
import { useGetMeQuery } from '../../../services/auth/auth.service'
import { Avatar } from '../avatar'
import { Button } from '../button'
import { DropDownMenu, DropDownMenuItem } from '../dropDownMenu'
import { Typography } from '../typography'

import s from './header.module.scss'

export const Header = () => {
  const { data: me } = useGetMeQuery()

  return (
    <header className={s.header}>
      <div className={s.container}>
        <SvgLogo />
        {me ? (
          <DropDownMenu userInfo={me} avatar={ava}>
            <DropDownMenuItem>
              <div className={s.menuItem}>
                <Avatar src={ava} />
                <div>
                  <Typography as={'p'} variant={'subtitle2'}>
                    {me.name}
                  </Typography>
                  <Typography as={'p'} variant={'caption'} className={s.email}>
                    {me.email}
                  </Typography>
                </div>
              </div>
            </DropDownMenuItem>
            <DropDownMenuItem>
              <div className={s.menuItem}>
                <SvgAva />
                <p>My profile</p>
              </div>
            </DropDownMenuItem>
            <DropDownMenuItem>
              <div className={s.menuItem}>
                <SvgOut />
                <p>Log out</p>
              </div>
            </DropDownMenuItem>
          </DropDownMenu>
        ) : (
          <Button as="a" href="/login">
            Sing In
          </Button>
        )}
      </div>
    </header>
  )
}
