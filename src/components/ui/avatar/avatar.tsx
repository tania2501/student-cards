import { ComponentProps, FC } from 'react'

import s from './avatar.module.scss'

export type AvatarProps = ComponentProps<'img'> & {
  name?: string
  src: ComponentProps<'img'>['src']
  size?: ComponentProps<'img'>['width']
}

export const Avatar: FC<AvatarProps> = ({ name, src, size = 36, ...rest }) => {
  return (
    <img
      className={s.avatar}
      src={src}
      alt={`${name} avatar`}
      width={size}
      height={size}
      {...rest}
    />
  )
}
