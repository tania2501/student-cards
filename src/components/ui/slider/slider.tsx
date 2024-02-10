import { ChangeEvent, ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as Slider from '@radix-ui/react-slider'

import { Input } from '../input'

import s from './slider.module.scss'

export const MainSlider = forwardRef<
  ElementRef<typeof Slider.Root>,
  ComponentPropsWithoutRef<typeof Slider.Root>
>(({ className, onValueChange, value, ...props }, ref) => {
  const changeMinValue = (e: ChangeEvent<HTMLInputElement>) => {
    onValueChange?.([+e.currentTarget.value, value?.[1] || 100])
  }
  const changeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
    onValueChange?.([value?.[0] || 0, +e.currentTarget.value])
  }

  return (
    <div className={s.container}>
      <Input
        className={s.value}
        type="number"
        value={value?.[0]}
        onChange={changeMinValue}
        min={0}
        max={100}
      />
      <Slider.Root
        ref={ref}
        className={s.SliderRoot}
        {...props}
        value={value}
        onValueChange={onValueChange}
      >
        <Slider.Track className={s.SliderTrack}>
          <Slider.Range className={s.SliderRange} />
        </Slider.Track>
        <Slider.Thumb className={s.SliderTab} />
        <Slider.Thumb className={s.SliderTab} />
      </Slider.Root>
      <Input
        className={s.value}
        value={value?.[1]}
        type="number"
        onChange={changeMaxValue}
        min={0}
        max={100}
      />
    </div>
  )
})
