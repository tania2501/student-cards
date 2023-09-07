import { Dispatch, SetStateAction, forwardRef, useState } from 'react'

import * as Select from '@radix-ui/react-select'

import { SvgArrowDown, SvgArrowTop } from '../../../assets/icons/arrow'
import { Typography } from '../typography'

import s from './select.module.scss'

type SelectPropsType = {
  onChange: Dispatch<SetStateAction<string>>
  value: string[]
  defaultValue: string
}

export const MainSelect = (props: SelectPropsType) => {
  const [icon, setIcon] = useState<JSX.Element>(<SvgArrowDown />)
  const change = () => {
    if (icon.type.name === 'SvgArrowDown') {
      setIcon(<SvgArrowTop />)
    } else {
      setIcon(<SvgArrowDown />)
    }
  }

  return (
    <div className={s.main}>
      <Select.Root onOpenChange={change} onValueChange={props.onChange}>
        <Select.Trigger className={s.SelectTrigger}>
          <Select.Value className={s.value} placeholder={props.defaultValue} />
          <Select.Icon className={s.SelectIcon}>{icon}</Select.Icon>
        </Select.Trigger>
        <Select.Content position="popper" className={s.SelectContent}>
          {props.value.map((el, i) => {
            return (
              <SelectItem key={i} value={el}>
                <Typography variant="body2">{el}</Typography>
              </SelectItem>
            )
          })}
        </Select.Content>
      </Select.Root>
    </div>
  )
}

const SelectItem = forwardRef<HTMLDivElement, Select.SelectItemProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Select.Item className={s.SelectItem} {...props} ref={ref}>
        <Select.ItemText>
          <Typography variant="body1">{children}</Typography>
        </Select.ItemText>
        <Select.ItemIndicator className={s.SelectItemIndicator}></Select.ItemIndicator>
      </Select.Item>
    )
  }
)
