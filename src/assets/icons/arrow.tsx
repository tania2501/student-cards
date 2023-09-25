import { ComponentProps, FC } from 'react'

export const SvgArrowDown: FC<ComponentProps<'svg'>> = props => (
  <svg xmlns="http://www.w3.org/2000/svg" width={15} height={8} fill="none" {...props}>
    <path
      fill="#fff"
      d="M.514 1.458a1 1 0 0 1 1.64-.77l5.36 4.48 5.37-4.32a1 1 0 0 1 1.41.15 1 1 0 0 1-.15 1.46l-6 4.83a1 1 0 0 1-1.27 0l-6-5a1 1 0 0 1-.36-.83Z"
    />
  </svg>
)
export const SvgArrowTop = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={15} height={8} fill="none">
    <path
      fill="#fff"
      d="M14.542 6.514a1 1 0 0 1-1.64.77l-5.36-4.48-5.37 4.32a1 1 0 0 1-1.41-.15 1 1 0 0 1 .15-1.46l6-4.83a1 1 0 0 1 1.27 0l6 5a1 1 0 0 1 .36.83Z"
    />
  </svg>
)
