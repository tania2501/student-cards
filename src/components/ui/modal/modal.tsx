import { ComponentProps, FC } from 'react'

import { Typography } from '../typography'

import s from './modal.module.scss'
{
  /* <div ref={ref} className={`${s.modal} ${className}`} {...restProps}></div> */
}
type ModalProps = ComponentProps<'div'> & {
  setShowModal: (show: boolean) => void
  title: string
}

export const Modal: FC<ModalProps> = ({ setShowModal, title, children }) => {
  return (
    <div className={s.modalWindow}>
      <div className={s.overlay}></div>
      <div className={s.main}>
        <div className={s.modalTitle}>
          <Typography variant="h2">{title}</Typography>
          <div onClick={() => setShowModal(false)} style={{ cursor: 'pointer' }}>
            X
          </div>
        </div>
        <>{children}</>
      </div>
    </div>
  )
}
