import { SvgLogo } from '../../assets/icons/logo'
import { Button } from '../ui/button'

import s from './header.module.scss'

export const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <SvgLogo />
        <Button as="a" href="/login">
          Sing In
        </Button>
      </div>
    </header>
  )
}
