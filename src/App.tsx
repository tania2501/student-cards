import { SvgAva, SvgOut } from './assets/icons/menu-icons'
import { ForgotPassword } from './components/auth/forgot password/forgot'
import { SchemaType } from './components/auth/form schema/schema'
import { SingIn } from './components/auth/sing-in/sing-in'
import { SingUp } from './components/auth/sing-up/sing-up'
import { Avatar } from './components/ui/avatar'
import { CheckBox } from './components/ui/checkbox'
import { DropDownMenu, MenuItemsType } from './components/ui/dropDownMenu/dropDownMenu'
import { Header } from './components/ui/header'
import { Pagination } from './components/ui/pagination'
import { CardsRadioGroup } from './components/ui/radio-group'
import { MainSelect } from './components/ui/select'
import { MainSlider } from './components/ui/slider'

const menuItems: MenuItemsType[] = [
  {
    icon: (
      <Avatar src="https://png2.cleanpng.com/sh/a763c2aa5f08b95da4bc5c15cfb8c7c8/L0KzQYm4UcI5N6V3epH0aYP2gLBuTf5qdptmReJ4coTkcr3sTf5mfKh0it02Z4LkgLnwgCMua5DyiOd9ZYKwebT2jwMuaadmRd9qY33kc77og702apdqeaYEY0fnQYrrUL4xOWc3S6U6NkG4RIS7UcQ6PGE6SaQ9LoDxd1==/kisspng-ninja-portable-network-graphics-computer-icons-ava-macmacmac-5bfea49c7d19d0.0162331615434149405124.png" />
    ),
    text: 'My name',
    email: 'eeeeeee@dkfkkf.com',
  },
  { icon: <SvgAva />, text: 'My Profile' },
  { icon: <SvgOut />, text: 'Log out' },
]

const options = [
  { value: '1', label: 'yes' },
  { value: '2', label: 'no' },
]
const onSubmit = (data: any) => {
  // eslint-disable-next-line no-console
  console.log(data)
}

export function App() {
  return (
    <div style={{ paddingTop: '70px' }}>
      <CheckBox />
      <Header />
      <MainSlider value={[2, 10]} step={1} max={15} />
      <Pagination contentPerPage={1} count={12} />
      <MainSelect value={['1', '2', '3']} defaultValue="Select" onChange={() => {}} />
      <CardsRadioGroup options={options} />
      <DropDownMenu items={menuItems} />
      <SingIn onSubmit={onSubmit} />
      <SingUp onSubmit={onSubmit} />
      <ForgotPassword onSubmit={onSubmit} />
    </div>
  )
}
