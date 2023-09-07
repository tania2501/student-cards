import * as RadioGroup from '@radix-ui/react-radio-group'

import s from './radio-group.module.scss'

export const CardsRadioGroup = () => {
  return (
    <div className={s.main}>
      <RadioGroup.Root className={s.RadioGroupRoot} defaultValue="1" aria-label="View density">
        <div className={s.value}>
          <RadioGroup.Item className={s.RadioGroupItem} value="1" id="r1">
            <span className={s.span}></span>
            <RadioGroup.Indicator className={s.RadioGroupIndicator} />
          </RadioGroup.Item>
          <label className={s.Label} htmlFor="r1">
            Default
          </label>
        </div>
        <div className={s.value}>
          <RadioGroup.Item className={s.RadioGroupItem} value="2" id="r2">
            <span className={s.span}></span>
            <RadioGroup.Indicator className={s.RadioGroupIndicator} />
          </RadioGroup.Item>
          <label className={s.Label} htmlFor="r2">
            new
          </label>
        </div>
        <div className={s.value}>
          <RadioGroup.Item className={s.RadioGroupItem} value="3" id="r3">
            <span className={s.span}></span>
            <RadioGroup.Indicator className={s.RadioGroupIndicator} />
          </RadioGroup.Item>
          <label className={s.Label} htmlFor="r3">
            next
          </label>
        </div>
      </RadioGroup.Root>
    </div>
  )
}
