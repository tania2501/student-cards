import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as Slider from '@radix-ui/react-slider'

import { Input } from '../input'

import s from './slider.module.scss'

export const MainSlider = forwardRef<
  ElementRef<typeof Slider.Root>,
  ComponentPropsWithoutRef<typeof Slider.Root>
>(({ className, onValueChange, value, ...props }, ref) => {
  return (
    <div className={s.container}>
      <Input
        className={s.value}
        type="number"
        value={value?.[0]}
        onChange={e => onValueChange?.([+e.currentTarget.value, value?.[1] || 100])}
        min={0}
        max={100}
      />
      <Slider.Root
        value={value}
        onValueChange={onValueChange}
        {...props}
        ref={ref}
        className={s.SliderRoot}
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
        onChange={e => onValueChange?.([value?.[0] || 0, +e.currentTarget.value])}
        min={0}
        max={100}
      />
    </div>
  )
})
