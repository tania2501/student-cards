import { ComponentPropsWithoutRef } from 'react'

import s from './card.module.scss'

export type CardProps = {} & ComponentPropsWithoutRef<'div'>

export const Card = (props: CardProps) => {
  return <div className={s.main} {...props}></div>
}
