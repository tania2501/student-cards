import * as Checkbox from '@radix-ui/react-checkbox'

import { CheckboxIcon } from '../../../assets/icons/checkbox'

import s from './checkbox.module.scss'

export type CheckBoxProps = {
  checked: boolean
}

export const CheckBox = (props: CheckBoxProps) => {
  return (
    <Checkbox.Root className={`${s.CheckboxRoot} ${props.checked ? s.checked : s.unchecked}`}>
      <CheckboxIcon />
    </Checkbox.Root>
  )
}
