import { ComponentProps, ComponentPropsWithoutRef, useState } from 'react'

import { clsx } from 'clsx'

import { SvgSearch } from '../../../assets/icons/search'
import { SvgUnvisible } from '../../../assets/icons/unVisiblePassword'
import { SvgVisible } from '../../../assets/icons/visiblePassword'
import { Typography } from '../typography'

import s from './input.module.scss'

export type InputProps = {
  className?: string
  label?: string
  errorMessage?: string
  onChangeValue?: () => void
} & ComponentPropsWithoutRef<'input'>

export const Input = (
  props: InputProps & Omit<ComponentPropsWithoutRef<'input'>, keyof InputProps>
) => {
  const [visible, setVisible] = useState(false)
  const isShowPassword = props.type === 'password'
  const isTypeSearch = props.type === 'search'
  const { className, label, errorMessage, type, placeholder, ...rest } = props
  const getFinalType = (type: ComponentProps<'input'>['type'], showPassword: boolean) => {
    if (type === 'password' && showPassword) {
      return 'text'
    }

    return type
  }
  const finalType = getFinalType(type, visible)
  const classNames = {
    input: clsx(s.input, !!isTypeSearch && s.svgSearch, !!errorMessage && s.error),
    label: clsx(s.label),
    container: clsx(s.main),
    visible: clsx(s.visible),
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
        <input className={classNames.input} type={finalType} placeholder={placeholder} {...rest} />
        {isShowPassword && (
          <button className={classNames.visible} onClick={() => setVisible(prev => !prev)}>
            {visible ? <SvgVisible /> : <SvgUnvisible />}
          </button>
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
