import { ComponentPropsWithoutRef } from 'react'

import s from './input.module.scss'


export type InputProps = {
  type: 'text' | 'password' | 'search' | 'email'
  fullWidth?: boolean
  className?: string
  name: string
} & ComponentPropsWithoutRef<'input'>

export const Input = (
  props: InputProps & Omit<ComponentPropsWithoutRef<'input'>, keyof InputProps>
) => {
  const { type = 'text', fullWidth, className, name, ...rest } = props

  return (
    <div>
      <label className={s.label}>{name}</label>
      <input className={`${s[type]} ${fullWidth ? s.fullWidth : ''} ${className}`} {...rest} />
    </div>
  )
}
