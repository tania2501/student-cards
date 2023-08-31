import * as Checkbox from '@radix-ui/react-checkbox'

import { CheckboxIcon, UncheckedIcon } from '../../../assets/icons/checkbox'

import s from './checkbox.module.scss'

export type CheckBoxProps = {
  checked?: boolean
  onChange?: (checked: boolean) => void
}

export const CheckBox = (props: CheckBoxProps) => {
  const { checked, onChange } = props

  return (
    <Checkbox.Root
      className={`${s.CheckboxRoot} ${props.checked ? s.checked : s.unchecked}`}
      onCheckedChange={onChange}
    >
      {checked ? <CheckboxIcon /> : <UncheckedIcon />}
    </Checkbox.Root>
  )
}
