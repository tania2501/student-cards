import * as Checkbox from '@radix-ui/react-checkbox'

import { CheckboxIcon, UncheckedIcon } from '../../../assets/icons/checkbox'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  className?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  required?: boolean
  label?: string
  id?: string
  position?: 'left'
}

export const CheckBox = (props: CheckboxProps) => {
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
