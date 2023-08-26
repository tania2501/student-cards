import { Button } from './components/ui/button'
import { CheckBox } from './components/ui/checkbox/checkbox'
import { Input } from './components/ui/input'

export function App() {
  return (
    <div>
      <Button />
      <Input type="text" placeholder="Input" name="Input" />
      <CheckBox checked={true} />
    </div>
  )
}
