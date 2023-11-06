import { forwardRef } from 'react'

import * as RadioGroup from '@radix-ui/react-radio-group'

import { Typography } from '../typography'

import s from './radio-group.module.scss'

export type Option = {
  label: string
  value: string
}

export type RadioGroupProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadioGroup.Root>,
  'children'
> & {
  options: Option[]
  errorMessage?: string
  defaultValue?: string
  onChange?: (value: string) => void
}

export const CardsRadioGroup = forwardRef<
  React.ElementRef<typeof RadioGroup.Root>,
  RadioGroupProps
>((props, ref) => {
  return (
    <div className={s.main}>
      <RadioGroup.Root
        className={s.RadioGroupRoot}
        defaultValue={props.defaultValue}
        onValueChange={props.onChange}
        ref={ref}
      >
        {props.options.map(el => (
          <div className={s.value} key={el.value}>
            <RadioGroup.Item className={s.RadioGroupItem} value={el.value} id={el.value}>
              <span className={s.span}></span>
              <RadioGroup.Indicator className={s.RadioGroupIndicator} />
            </RadioGroup.Item>
            <Typography variant={'body2'} as={'label'} htmlFor={el.label} className={s.Label}>
              {el.label}
            </Typography>
          </div>
        ))}
      </RadioGroup.Root>
    </div>
  )
})
