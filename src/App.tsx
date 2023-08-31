import { CheckBox } from './components/ui/checkbox'
import { Input } from './components/ui/input'

export function App() {
  return (
    <div>
      <Input type="text" placeholder="Input" label="Input" errorMessage="aaa" />
      <CheckBox />
    </div>
  )
}
