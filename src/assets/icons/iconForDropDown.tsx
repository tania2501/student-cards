import { ComponentProps, FC } from 'react'

export const SvgMenuIcon: FC<ComponentProps<'svg'>> = props => (
  <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} fill="none" {...props}>
    <path
      fill="#fff"
      d="M6 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6 3.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6 10.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
    />
  </svg>
)
