import { useState } from 'react'

import { Link } from 'react-router-dom'

import { SvgDelete, SvgEdit, SvgPlay } from '../../assets/icons/menu-icons'
import { Pagination } from '../../components/ui/pagination'
import { MainSelect } from '../../components/ui/select'
import { Column, Sort, Table } from '../../components/ui/table'
import { Typography } from '../../components/ui/typography'
import { useGetMeQuery } from '../../services/auth/auth.service'
import { useGetDecksQuery } from '../../services/decks/decks.service'

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
  const [range, setRange] = useState([0, 100])
  const sortString = sort ? `${sort.key}-${sort.direction}` : null
  const [pageCount, setPageCount] = useState(JSON.stringify(10))
  const [page, setPage] = useState<number>(1)

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

  return (
    <div>
      <Table.Root>
        <Table.Header columns={columns} sort={sort} onSort={setSort} />
        <Table.Body>
          {decks?.items.map(deck => (
            <Table.Row key={deck.id}>
              <Table.Cell>
                <Typography variant="body2" as={Link} to={'/cards/id'} className={s.cardsPackName}>
                  {deck.name}
                </Typography>
              </Table.Cell>
              <Table.Cell>{deck.cardsCount}</Table.Cell>
              <Table.Cell>{new Date(deck.updated).toLocaleDateString('da-DK')}</Table.Cell>
              <Table.Cell>{deck.author.name}</Table.Cell>
              <Table.Cell>
                <button>
                  <SvgPlay />
                </button>
                <button>
                  <SvgEdit />
                </button>
                <button>
                  <SvgDelete />
                </button>
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
            value={['5', '6', '10', '20']}
            defaultValue={JSON.stringify(decks?.pagination.itemsPerPage) ?? 1}
            onChange={setPageCount}
          />
          <Typography as="span">на странице</Typography>
        </div>
      </div>
    </div>
  )
}
