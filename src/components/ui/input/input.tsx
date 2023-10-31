import { ComponentProps, ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { clsx } from 'clsx'

import { SvgSearch } from '../../../assets/icons/search'
import { SvgUnvisible } from '../../../assets/icons/unVisiblePassword'
import { SvgVisible } from '../../../assets/icons/visiblePassword'
import { Typography } from '../typography'

import s from './input.module.scss'

export type InputProps = {
  onValueChange?: (value: string) => void
  containerProps?: ComponentProps<'div'>
  labelProps?: ComponentProps<'label'>
  errorMessage?: string
  label?: string
} & ComponentPropsWithoutRef<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      errorMessage,
      placeholder,
      type,
      containerProps,
      labelProps,
      label,
      onChange,
      onValueChange,
      ...restProps
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false)
    const isShowPassword = type === 'password'
    const isTypeSearch = type === 'search'
    const getFinalType = (type: ComponentProps<'input'>['type'], showPassword: boolean) => {
      if (type === 'password' && showPassword) {
        return 'text'
      }

      return type
    }
    const finalType = getFinalType(type, visible)
    const classNames = {
      input: clsx(className, s.input, !!isTypeSearch && s.svgSearch, !!errorMessage && s.error),
      label: clsx(s.label),
      container: clsx(s.main),
      visible: clsx(s.visible),
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onValueChange?.(e.currentTarget.value)
    }

    return (
      <div className={classNames.container}>
        {label && (
          <Typography as="label" variant="body2" className={classNames.label}>
            {label}
          </Typography>
        )}
        <div className={s.inputIcon}>
          <div className={s.search}>{type === 'search' && <SvgSearch />}</div>
          <input
            className={classNames.input}
            type={finalType}
            placeholder={placeholder}
            onChange={handleChange}
            ref={ref}
            {...restProps}
          />
          {isShowPassword && (
            <div className={classNames.visible}>
              {visible ? (
                <SvgVisible onClick={() => setVisible(false)} />
              ) : (
                <SvgUnvisible onClick={() => setVisible(true)} />
              )}
            </div>
          )}
        </div>
        {errorMessage && (
          <Typography variant="error" className={s.error}>
            {errorMessage}
          </Typography>
        )}
      </div>
    )
  }
)
