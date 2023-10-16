import { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import { Button } from '../../../components/ui/button'
import { Typography } from '../../../components/ui/typography'
import { useDeleteDecksMutation } from '../../../services/decks/decks.service'
import { Deck } from '../../../services/decks/types'
import s from '../decks.module.scss'

type DeletePackType = {
  setShowModal: (show: boolean) => void
  deck: Deck
}

export const DeletePack: FC<DeletePackType> = ({ setShowModal, deck }) => {
  const [deletePack] = useDeleteDecksMutation()
  const navigate = useNavigate()

  const onDelete = (id: string) => {
    deletePack({ id })
    setShowModal(false)
    navigate('/')
  }

  return (
    <div className={s.form}>
      <div className={s.deletePackText}>
        <Typography variant={'subtitle'}>
          Do you really want to remove {deck?.name} pack?
        </Typography>
        <Typography variant={'subtitle'}>All cards will be deleted.</Typography>
      </div>
      <div className={s.modalButton}>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => onDelete(deck?.id!)}>
          Delete Pack
        </Button>
      </div>
    </div>
  )
}
