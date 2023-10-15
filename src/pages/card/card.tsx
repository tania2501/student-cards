import { useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import { SvgMenuIcon } from '../../assets/icons/iconForDropDown'
import { SvgDelete, SvgEdit, SvgPlay } from '../../assets/icons/menu-icons'
import { Button } from '../../components/ui/button'
import { DropDownMenu, DropDownMenuItem } from '../../components/ui/dropDownMenu'
import { Input } from '../../components/ui/input'
import { Modal } from '../../components/ui/modal/modal'
import { Pagination } from '../../components/ui/pagination'
import { Rating } from '../../components/ui/rating/rating'
import { Column, Table } from '../../components/ui/table'
import { Typography } from '../../components/ui/typography'
import { useGetMeQuery } from '../../services/auth/auth.service'
import { Card } from '../../services/card/types'
import { useGetCardsQuery, useGetDecksByIdQuery } from '../../services/decks/decks.service'

import s from './card.module.scss'
import { CreateCard } from './create-card-form/create-card'
import { DeleteCard } from './delete-card/delete-card'
import { UpdateCard } from './update-card/update-card'

const columns: Column[] = [
  {
    key: 'Question',
    title: 'Question',
    sortable: true,
  },
  {
    key: 'updated',
    title: 'Last Updated',
    sortable: true,
  },
  {
    key: 'grade',
    title: 'Grade',
    sortable: true,
  },
  {
    key: 'actions',
    title: '',
    sortable: false,
  },
]

export const CardPage = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState<number>(1)
  const [showCreateCardModal, setShowCreateModal] = useState(false)
  const [showDeleteCardModal, setShowDeleteModal] = useState(false)
  const [showEditCard, setShowEdtCard] = useState(false)
  const [cardItem, setCardItem] = useState<Card>({} as Card)
  const { id } = useParams<{ id: string }>()
  const { data: deck } = useGetDecksByIdQuery({
    id: id || '',
  })
  const { data: cards } = useGetCardsQuery({
    id: id || '',
    answer: search,
    itemsPerPage: 5,
    currentPage: page,
  })

  const { data: me } = useGetMeQuery()
  const isMyDeck = me?.id === deck?.userId
  const onDeleteCard = (card: Card) => {
    setCardItem(card)
    setShowDeleteModal(true)
  }
  const onEditCard = (card: Card) => {
    setCardItem(card)
    setShowEdtCard(true)
  }

  return (
    <div>
      {showCreateCardModal && (
        <Modal setShowModal={setShowCreateModal} title="Add New Card">
          <CreateCard id={deck?.id!} setShow={setShowCreateModal} />
        </Modal>
      )}
      {showDeleteCardModal && (
        <Modal setShowModal={setShowDeleteModal} title="Delete card">
          <DeleteCard card={cardItem} setShowModal={setShowDeleteModal} />
        </Modal>
      )}
      {showEditCard && (
        <Modal setShowModal={setShowEdtCard} title="Edit card">
          <UpdateCard card={cardItem} setShowModal={setShowEdtCard} />
        </Modal>
      )}
      <Typography
        as="button"
        onClick={() => window.history.back()}
        variant="body2"
        className={s.linkButton}
      >
        &#8592; Back to packs list
      </Typography>
      {deck?.cardsCount! > 0 ? (
        <>
          <div>
            {isMyDeck ? (
              <>
                <div className={s.packName}>
                  <div className={s.menuIcon}>
                    <Typography variant="large">My Pack</Typography>
                    <DropDownMenu icon={<SvgMenuIcon />}>
                      <DropDownMenuItem>
                        <div className={s.menuIcon}>
                          <SvgPlay />
                          <p>Learn</p>
                        </div>
                      </DropDownMenuItem>
                      <DropDownMenuItem>
                        <div className={s.menuIcon}>
                          <SvgEdit />
                          <p>Edit</p>
                        </div>
                      </DropDownMenuItem>
                      <DropDownMenuItem>
                        <div className={s.menuIcon} onClick={() => {}}>
                          <SvgDelete />
                          <p>Delete</p>
                        </div>
                      </DropDownMenuItem>
                    </DropDownMenu>
                  </div>
                  <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                    Add new card
                  </Button>
                </div>
              </>
            ) : (
              <div className={s.packName}>
                <Typography variant="large">Friends pack</Typography>
                <Button variant="primary">Learn to Pack</Button>
              </div>
            )}
          </div>
          <Input
            type="search"
            placeholder="Input search"
            value={search}
            onValueChange={setSearch}
            style={{ marginBottom: '24px' }}
          />
          <Table.Root>
            <Table.Header columns={columns} />
            <Table.Body>
              {cards?.items.map(card => (
                <Table.Row key={card.id}>
                  <Table.Cell>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {card.questionImg ? (
                        <img
                          src={card.questionImg}
                          alt="#"
                          style={{ width: '113px', height: '48px' }}
                        />
                      ) : (
                        ''
                      )}
                      <Typography
                        variant="body2"
                        as={Link}
                        to={`/cards/${card.id}`}
                        className={s.cardsQuestion}
                      >
                        {card.question}
                      </Typography>
                    </div>
                  </Table.Cell>
                  <Table.Cell>{new Date(card.updated).toLocaleDateString('da-DK')}</Table.Cell>
                  <Table.Cell className={s.svgButtons}>
                    <Rating value={card.rating} />
                  </Table.Cell>
                  <Table.Cell>
                    {isMyDeck && (
                      <div>
                        <button>
                          <SvgEdit onClick={() => onEditCard(card)} />
                        </button>
                        <button>
                          <SvgDelete onClick={() => onDeleteCard(card)} />
                        </button>
                      </div>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
          <Pagination
            contentPerPage={cards?.pagination.itemsPerPage ?? 1}
            count={cards?.pagination.totalItems ?? 1}
            currentPage={cards?.pagination.currentPage ?? 1}
            setCurrentPage={setPage}
          />
        </>
      ) : (
        <div>
          <div>
            <Typography variant="large" className={s.packName}>
              {deck?.name}
            </Typography>
            <div className={s.packInfo}>
              <Typography>
                {isMyDeck
                  ? 'This pack is empty. Click add new card to fill this pack'
                  : 'This pack is empty'}
              </Typography>
              {isMyDeck && (
                <Button
                  variant="primary"
                  className={s.addCardButton}
                  onClick={() => setShowCreateModal(true)}
                >
                  Add New Card
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
