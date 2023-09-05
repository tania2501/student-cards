import { LoginForm } from './components/auth/login-form/login-form'
import { CheckBox } from './components/ui/checkbox'
import { Header } from './components/ui/header'
import { Input } from './components/ui/input'
import { Pagination } from './components/ui/pagination'
import { MainSelect } from './components/ui/select'
import { MainSlider } from './components/ui/slider'

export function App() {
  return (
    <div>
      <Input type="text" placeholder="Input" label="Input" errorMessage="aaa" />
      <CheckBox />
      <div style={{ width: '400px' }}>
        <LoginForm />
      </div>
      <Header />
      <MainSlider value={[2, 10]} step={1} max={15} />
      <Pagination contentPerPage={1} count={12} />
      <MainSelect />
    </div>
  )
}
