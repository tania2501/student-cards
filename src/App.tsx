import { LoginForm } from './components/auth/login-form/login-form'
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
    </div>
  )
}
