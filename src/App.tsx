import ava from './assets/IMG_20230424_174148.jpg'
import { CheckEmail } from './components/auth/Check email/check'
import { NewPassword } from './components/auth/create new password/createNewPassword'
import { ForgotPassword } from './components/auth/forgot password/forgot'
import { SingIn } from './components/auth/sing-in/sing-in'
import { SingUp } from './components/auth/sing-up/sing-up'
import { CheckBox } from './components/ui/checkbox'
import { Header } from './components/ui/header'
import { Pagination } from './components/ui/pagination'
import { CardsRadioGroup } from './components/ui/radio-group'
import { MainSelect } from './components/ui/select'
import { MainSlider } from './components/ui/slider'

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
      <Header isAuth={true} userInfo={{ name: 'Tania', email: 'evdunova@mail', avatar: ava }} />
      <MainSlider value={[2, 10]} step={1} max={15} />
      <Pagination contentPerPage={1} count={12} />
      <MainSelect value={['1', '2', '3']} defaultValue="Select" onChange={() => {}} />
      <CardsRadioGroup options={options} />
      <SingIn onSubmit={onSubmit} />
      <SingUp onSubmit={onSubmit} />
      <ForgotPassword onSubmit={onSubmit} />
      <NewPassword onSubmit={onSubmit} />
      <CheckEmail />
    </div>
  )
}
