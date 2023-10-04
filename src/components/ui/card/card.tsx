import { ComponentPropsWithoutRef, forwardRef } from 'react'

import s from './card.module.scss'

export type CardProps = {} & ComponentPropsWithoutRef<'div'>

export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...restProps }, ref) => {
  return <div ref={ref} className={`${s.main} ${className}`} {...restProps}></div>
})

export const Modal = forwardRef<HTMLDivElement, CardProps>(({ className, ...restProps }, ref) => {
  return <div ref={ref} className={`${s.modal} ${className}`} {...restProps}></div>
})
