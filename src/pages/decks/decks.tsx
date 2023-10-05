import { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { SvgDelete, SvgEdit, SvgPlay } from '../../assets/icons/menu-icons'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Modal } from '../../components/ui/modal/modal'
import { Pagination } from '../../components/ui/pagination'
import { MainSelect } from '../../components/ui/select'
import { MainSlider } from '../../components/ui/slider'
import { Column, Sort, Table } from '../../components/ui/table'
import { CardsTabs } from '../../components/ui/tabs'
import { Typography } from '../../components/ui/typography'
import { useGetMeQuery } from '../../services/auth/auth.service'
import { useGetDecksQuery } from '../../services/decks/decks.service'

import { CreateDecksForm } from './create-decks-form/create-decks-form'
import s from './decks.module.scss'

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
  const [sort, setSort] = useState<Sort>({ key: 'updated', direction: 'asc' })
  const [search, setSearch] = useState('')
  const [showMyDecks, setShowMyDecks] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [range, setRange] = useState([0, 100])
  const sortString = sort ? `${sort.key}-${sort.direction}` : null
  const [pageCount, setPageCount] = useState(JSON.stringify(10))
  const [page, setPage] = useState<number>(1)
  const resetFilters = () => {
    setSearch('')
    setShowMyDecks(false)
    setRange([0, 100])
  }

  const { data: user } = useGetMeQuery()
  const { data: decks } = useGetDecksQuery({
    itemsPerPage: +pageCount,
    name: search,
    authorId: showMyDecks ? user?.id : undefined,
    minCardsCount: range[0],
    maxCardsCount: range[1],
    orderBy: sortString,
    currentPage: page,
  })
  const navigate = useNavigate()

  return (
    <div>
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <CreateDecksForm setShowModal={setShowModal} />
        </Modal>
      )}
      <div className={s.caption}>
        <Typography variant={'large'}>Packs list</Typography>
        <Button variant="primary" onClick={() => setShowModal(!showModal)}>
          Add New Pack
        </Button>
      </div>
      <div className={s.instruments}>
        <Input type="search" placeholder="Input search" value={search} onValueChange={setSearch} />
        <div>
          <Typography as="p" variant="body2" className={s.title}>
            Show packs cards
          </Typography>
          <CardsTabs
            tabsTitle={['My cards', 'All cards ']}
            show={showMyDecks}
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
        <Table.Header columns={columns} sort={sort} onSort={setSort} />
        <Table.Body>
          {decks?.items.map(deck => (
            <Table.Row key={deck.id}>
              <Table.Cell>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {deck.cover ? (
                    <img src={deck.cover} alt="#" style={{ width: '113px', height: '48px' }} />
                  ) : (
                    ''
                  )}
                  <Typography
                    variant="body2"
                    as={Link}
                    to={'/cards/id'}
                    className={s.cardsPackName}
                  >
                    {deck.name}
                  </Typography>
                </div>
              </Table.Cell>
              <Table.Cell>{deck.cardsCount}</Table.Cell>
              <Table.Cell>{new Date(deck.updated).toLocaleDateString('da-DK')}</Table.Cell>
              <Table.Cell>{deck.author.name}</Table.Cell>
              <Table.Cell>
                {showMyDecks ? (
                  <>
                    <button>
                      <SvgPlay onClick={() => navigate(`/cards/:${deck.id}`)} />
                    </button>
                    <button>
                      <SvgEdit />
                    </button>
                    <button>
                      <SvgDelete />
                    </button>
                  </>
                ) : (
                  <button>
                    <SvgPlay onClick={() => navigate(`/cards/:${deck.id}`)} />
                  </button>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <div className={s.pagination}>
        <Pagination
          currentPage={page}
          setCurrentPage={setPage}
          contentPerPage={decks?.pagination.itemsPerPage ?? 1}
          count={decks?.pagination.totalItems ?? 1}
        />
        <div className={s.select}>
          <Typography as="span" variant="body2">
            Показать
          </Typography>
          <MainSelect
            value={['5', '10', '15', '20']}
            defaultValue={JSON.stringify(decks?.pagination.itemsPerPage) ?? 1}
            onChange={setPageCount}
          />
          <Typography as="span">на странице</Typography>
        </div>
      </div>
    </div>
  )
}
