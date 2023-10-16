import { FC, useState } from 'react'

import { SvgMenuIcon } from '../../../assets/icons/iconForDropDown'
import { SvgPlay, SvgEdit, SvgDelete } from '../../../assets/icons/menu-icons'
import { DropDownMenu, DropDownMenuItem } from '../../../components/ui/dropDownMenu'
import { Modal } from '../../../components/ui/modal/modal'
import { Deck } from '../../../services/decks/types'
import { DeletePack } from '../../decks/delete-pack/delete-pack'
import { UpdateDecks } from '../../decks/update-decks/update-decks'
import s from '../card.module.scss'

type DropMenuType = {
  deck: Deck
}

export const DropMenu: FC<DropMenuType> = ({ deck }) => {
  const [edit, setEdit] = useState(false)
  const [deletePack, setDeletePack] = useState(false)

  return (
    <div className={s.ellipse}>
      {edit && (
        <Modal setShowModal={setEdit} title="Edit pack">
          <UpdateDecks setShowModal={setEdit} deck={deck} />
        </Modal>
      )}
      {deletePack && (
        <Modal setShowModal={setDeletePack} title="Delete pack">
          <DeletePack setShowModal={setDeletePack} deck={deck} />
        </Modal>
      )}
      <DropDownMenu icon={<SvgMenuIcon />}>
        <DropDownMenuItem>
          <div className={s.menuIcon}>
            <SvgPlay />
            <p>Learn</p>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem>
          <div className={s.menuIcon} onClick={() => setEdit(true)}>
            <SvgEdit />
            <p>Edit</p>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem>
          <div className={s.menuIcon} onClick={() => setDeletePack(true)}>
            <SvgDelete />
            <p>Delete</p>
          </div>
        </DropDownMenuItem>
      </DropDownMenu>
    </div>
  )
}
