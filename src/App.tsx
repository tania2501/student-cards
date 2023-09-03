import { LoginForm } from './components/auth/login-form/login-form'
import { Header } from './components/header'
import { MainSlider } from './components/slider'
import { CheckBox } from './components/ui/checkbox'
import { Input } from './components/ui/input'

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
    </div>
  )
}
