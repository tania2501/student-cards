import { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { SvgDelete, SvgEdit, SvgPlay } from '../../assets/icons/menu-icons'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Modal } from '../../components/ui/modal/modal'
import { Pagination } from '../../components/ui/pagination'
import { MainSelect } from '../../components/ui/select'
import { MainSlider } from '../../components/ui/slider'
import { Column, Table } from '../../components/ui/table'
import { CardsTabs } from '../../components/ui/tabs'
import { Typography } from '../../components/ui/typography'
import { useGetMeQuery } from '../../services/auth/auth.service'
import { deckSlice } from '../../services/decks/deck.slice'
import { useCreateDecksMutation, useGetDecksQuery } from '../../services/decks/decks.service'
import { Deck } from '../../services/decks/types'
import { useAppDispatch, useAppSelector } from '../../services/store'

import { DecksForm } from './create-decks-form/create-decks-form'
import s from './decks.module.scss'
import { DeletePack } from './delete-pack/delete-pack'
import { UpdateDecks } from './update-decks/update-decks'

export const Decks = () => {
  const columns: Column[] = [
    {
      key: 'name',
      title: 'Name',
      sortable: true,
    },
    {
      key: 'cardsCount',
      title: 'Cards',
      sortable: true,
    },
    {
      key: 'updated',
      title: 'Last Updated',
      sortable: true,
    },
    {
      key: 'author.name',
      title: 'Author',
      sortable: true,
    },
    {
      key: 'actions',
      title: '',
    },
  ]

  const dispatch = useAppDispatch()

  const currentPage = useAppSelector(state => state.deckSlice.currentPage)
  const searchByName = useAppSelector(state => state.deckSlice.searchByName)
  const pageCount = useAppSelector(state => state.deckSlice.itemsPerPage)
  const minCards = useAppSelector(state => state.deckSlice.minCardsCount)
  const maxCards = useAppSelector(state => state.deckSlice.maxCardsCount)
  const orderBy = useAppSelector(state => state.deckSlice.orderBy)
  const authorId = useAppSelector(state => state.deckSlice.authorId)

  const setAuthorId = (value: string | undefined) => dispatch(deckSlice.actions.setAuthorId(value))
  const setPageCount = (value: string) => dispatch(deckSlice.actions.setItemsPerPage(value))
  const setCurrentPage = (value: number) => dispatch(deckSlice.actions.setCurrentPage(value))
  const setSearchByName = (searchName: string) =>
    dispatch(deckSlice.actions.setSearchByName(searchName))
  const setOrderBy = (orderBy: string | null) => dispatch(deckSlice.actions.setOrderBy(orderBy))

  const [showMyDecks, setShowMyDecks] = useState<boolean>(authorId ? true : false)
  const [showCreateDeckModal, setShowCreateDeckModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [range, setRange] = useState<number[]>([minCards, maxCards])

  const resetFilters = () => {
    setSearchByName('')
    setShowMyDecks(false)
    setAuthorId(undefined)
    setRange([0, 100])
  }

  const { data: user } = useGetMeQuery()
  const [createDecks] = useCreateDecksMutation()
  const { data } = useGetDecksQuery({
    itemsPerPage: +pageCount,
    name: searchByName,
    authorId: authorId,
    minCardsCount: range[0],
    maxCardsCount: range[1],
    orderBy: orderBy,
    currentPage,
  })

  const [packInfo, setPackInfo] = useState<Deck>(data?.items[0]!)

  const navigate = useNavigate()
  const deletePack = (data: Deck) => {
    setShowDeleteModal(true)
    setPackInfo(data)
  }
  const editPack = (data: Deck) => {
    setShowEditModal(true)
    setPackInfo(data)
  }

  const learnPack = (id: string) => {
    navigate(`/cards/learn/${id}`)
  }

  return (
    <div>
      {showCreateDeckModal && (
        <Modal setShowModal={setShowCreateDeckModal} title={'Add new pack'}>
          <DecksForm
            setShowModal={setShowCreateDeckModal}
            decksForm={createDecks}
            title="Add New Pack"
          />
        </Modal>
      )}
      {showDeleteModal && (
        <Modal setShowModal={setShowDeleteModal} title="Delete Pack">
          <DeletePack setShowModal={setShowDeleteModal} deck={packInfo} />
        </Modal>
      )}
      {showEditModal && (
        <Modal setShowModal={setShowEditModal} title="Edit Pack">
          <UpdateDecks deck={packInfo} setShowModal={setShowEditModal} />
        </Modal>
      )}
      <div className={s.caption}>
        <Typography variant={'large'}>Packs list</Typography>
        <Button variant="primary" onClick={() => setShowCreateDeckModal(!showCreateDeckModal)}>
          Add New Pack
        </Button>
      </div>
      <div className={s.instruments}>
        <Input
          type="search"
          placeholder="Input search"
          value={searchByName}
          onValueChange={setSearchByName}
        />
        <div>
          <Typography as="p" variant="body2" className={s.title}>
            Show packs cards
          </Typography>
          <CardsTabs
            tabsTitle={['My cards', 'All cards ']}
            show={showMyDecks}
            setAuthorId={setAuthorId}
            userId={user?.id}
            setShow={setShowMyDecks}
          />
        </div>
        <div>
          <Typography as={'p'} variant={'body2'} className={s.title}>
            Number of cards
          </Typography>
          <MainSlider value={range} onValueChange={setRange} />
        </div>

        <Button variant="secondary" onClick={resetFilters}>
          <SvgDelete />
          <Typography variant="subtitle2">Clear Filter</Typography>
        </Button>
      </div>

      <Table.Root>
        <Table.Header columns={columns} setOrderBy={setOrderBy} />
        <Table.Body>
          {data &&
            data.items.map(deck => (
              <Table.Row key={deck.id}>
                <Table.Cell>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {deck.cover ? <img src={deck.cover} alt="#" style={{ width: '113px' }} /> : ''}
                    <Typography
                      variant="body2"
                      as={Link}
                      to={`/cards/${deck.id}`}
                      className={s.cardsPackName}
                    >
                      {deck.name}
                    </Typography>
                  </div>
                </Table.Cell>
                <Table.Cell>{deck.cardsCount}</Table.Cell>
                <Table.Cell>{new Date(deck.updated).toLocaleDateString('da-DK')}</Table.Cell>
                <Table.Cell>{deck.author.name}</Table.Cell>
                <Table.Cell className={s.svgButtons}>
                  {deck.author.id === user?.id ? (
                    <>
                      <button>
                        <SvgPlay onClick={() => learnPack(deck.id)} />
                      </button>
                      <button>
                        <SvgEdit onClick={() => editPack(deck)} />
                      </button>
                      <button>
                        <SvgDelete onClick={() => deletePack(deck)} />
                      </button>
                    </>
                  ) : (
                    <button>
                      <SvgPlay onClick={() => learnPack(deck.id)} />
                    </button>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
      <div className={s.pagination}>
        <Pagination
          page={currentPage}
          setPage={setCurrentPage}
          contentPerPage={data?.pagination.itemsPerPage ?? 1}
          count={data && data.pagination.totalItems > 0 ? data.pagination.totalItems : 1}
        />
        <div className={s.select}>
          <Typography as="span" variant="body2">
            Показать
          </Typography>
          <MainSelect
            value={['5', '10', '15', '20']}
            defaultValue={JSON.stringify(data?.pagination.itemsPerPage) ?? 1}
            onChange={setPageCount}
            className={s.selectPagination}
          />
          <Typography as="span">на странице</Typography>
        </div>
      </div>
    </div>
  )
}
