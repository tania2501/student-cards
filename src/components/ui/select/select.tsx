import { FC, forwardRef, useState } from 'react'

import * as Select from '@radix-ui/react-select'
import clsx from 'clsx'

import { SvgArrowDown, SvgArrowTop } from '../../../assets/icons/arrow'
import { Typography } from '../typography'

import s from './select.module.scss'

type SelectPropsType = {
  onChange?: (value: string) => void
  value: string[]
  defaultValue?: string
  className?: string
  style?: React.CSSProperties
}

export const MainSelect: FC<SelectPropsType & Omit<Select.SelectProps, keyof SelectPropsType>> = ({
  onChange,
  value,
  defaultValue,
  className,
  style,
  ...rest
}) => {
  const [icon, setIcon] = useState<JSX.Element>(<SvgArrowDown />)
  const change = () => {
    if (icon.type.name === 'SvgArrowDown') {
      setIcon(<SvgArrowTop />)
    } else {
      setIcon(<SvgArrowDown />)
    }
  }
  const classNames = {
    root: clsx(s.main, className),
  }

  return (
    <div className={classNames.root}>
      <Select.Root onOpenChange={change} onValueChange={onChange} {...rest}>
        <Select.Trigger className={s.SelectTrigger} style={style}>
          <Select.Value className={s.value} placeholder={defaultValue} />
          <Select.Icon className={s.SelectIcon}>{icon}</Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content position="popper" className={s.SelectContent}>
            {value.map((el, i) => {
              return (
                <SelectItem key={i} value={el}>
                  <Typography as="span" variant="body2">
                    {el}
                  </Typography>
                </SelectItem>
              )
            })}
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}

const SelectItem = forwardRef<HTMLDivElement, Select.SelectItemProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Select.Item className={s.SelectItem} {...props} ref={ref}>
        <Select.ItemText>
          <Typography as="span" variant="body1">
            {children}
          </Typography>
        </Select.ItemText>
        <Select.ItemIndicator className={s.SelectItemIndicator}></Select.ItemIndicator>
      </Select.Item>
    )
  }
)
