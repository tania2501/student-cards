import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as Slider from '@radix-ui/react-slider'

import s from './slider.module.scss'

export const MainSlider = forwardRef<
  ElementRef<typeof Slider.Root>,
  ComponentPropsWithoutRef<typeof Slider.Root>
>(({ className, ...props }, ref) => {
  return (
    <div className={s.container}>
      <span className={s.value}>{props?.value?.[0]}</span>
      <Slider.Root ref={ref} {...props} className={s.SliderRoot}>
        <Slider.Track className={s.SliderTrack}>
          <Slider.Range className={s.SliderRange} />
        </Slider.Track>
        <Slider.Thumb className={s.SliderTab} />
        <Slider.Thumb className={s.SliderTab} />
      </Slider.Root>
      <span className={s.value}>{props?.value?.[1]}</span>
    </div>
  )
})
