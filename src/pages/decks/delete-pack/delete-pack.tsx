import { FC } from 'react'

import { Button } from '../../../components/ui/button'
import { Typography } from '../../../components/ui/typography'
import { useDeleteDecksMutation } from '../../../services/decks/decks.service'
import s from '../decks.module.scss'

type DeletePackType = {
  setShowModal: (show: boolean) => void
  id: string
  name: string
}

export const DeletePack: FC<DeletePackType> = ({ setShowModal, id, name }) => {
  const [deletePack] = useDeleteDecksMutation()

  const onDelete = (id: string) => {
    deletePack({ id })
    setShowModal(false)
  }

  return (
    <div className={s.form}>
      <div className={s.deletePackText}>
        <Typography variant={'subtitle'}>Do you really want to remove {name} pack?</Typography>
        <Typography variant={'subtitle'}>All cards will be deleted.</Typography>
      </div>
      <div className={s.modalButton}>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => onDelete(id)}>
          Delete Pack
        </Button>
      </div>
    </div>
  )
}
