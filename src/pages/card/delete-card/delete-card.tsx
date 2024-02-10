import { FC } from 'react'

import { Button } from '../../../components/ui/button'
import { Typography } from '../../../components/ui/typography'
import { Card } from '../../../services/card/types'
import { useDeleteCardMutation } from '../../../services/decks/decks.service'
import s from '../cards.module.scss'

type DeleteCardType = {
  setShowModal: (show: boolean) => void
  card: Card
}

export const DeleteCard: FC<DeleteCardType> = ({ setShowModal, card }) => {
  const [deleteCard] = useDeleteCardMutation()

  const onDelete = (id: string) => {
    deleteCard({ id })
    setShowModal(false)
  }

  return (
    <div className={s.form}>
      <div className={s.deletePackText}>
        <Typography variant={'subtitle'}>
          Do you really want to remove card {card.question}?
        </Typography>
      </div>
      <div className={s.modalButton}>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => onDelete(card.id!)}>
          Delete Card
        </Button>
      </div>
    </div>
  )
}
