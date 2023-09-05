import { Component, forwardRef, useState } from 'react'

import * as Select from '@radix-ui/react-select'

import { SvgArrowDown, SvgArrowTop } from '../../../assets/icons/arrow'
import { Typography } from '../typography'

import s from './select.module.scss'

export const MainSelect = () => {

  return (
    <div className={s.main}>
      <Select.Root>
        <Select.Trigger className={s.SelectTrigger} placeholder="Select a fruit…">
          <Select.Value className={s.value} placeholder={'Select'} />
          <Select.Icon className={s.SelectIcon}>
            <SvgArrowDown />
          </Select.Icon>
        </Select.Trigger>
        <Select.Content position="popper" className={s.SelectContent}>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
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
