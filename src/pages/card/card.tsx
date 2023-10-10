import { useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Column, Table } from '../../components/ui/table'
import { Typography } from '../../components/ui/typography'
import { useGetMeQuery } from '../../services/auth/auth.service'
import { useGetCardsQuery } from '../../services/card/card.service'
import { useGetDecksByIdQuery } from '../../services/decks/decks.service'

import s from './card.module.scss'

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
]

export const CardPage = () => {
  const [search, setSearch] = useState('')
  const { id } = useParams<{ id: string }>()
  const { data: deck } = useGetDecksByIdQuery({
    id: id || '',
  })
  const { data: cards } = useGetCardsQuery({
    id: id || '',
  })

  const { data: me } = useGetMeQuery()
  const isMyDeck = me?.id === deck?.userId

  return (
    <div>
      <Button as={Link} to="/" variant="link">
        &#8592; Back to packs list
      </Button>
      {cards?.items.length! > 0 ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '30px 0' }}>
            <Typography variant="large">{isMyDeck ? 'My Pack' : 'Friends pack'}</Typography>
            <Button variant="primary">Learn to Pack</Button>
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
                  <Table.Cell className={s.svgButtons}>{card.rating}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </>
      ) : (
        <div>
          {isMyDeck ? (
            <div>
              <Typography variant="large">{deck?.name}</Typography>
              <Typography>This pack is empty. Click add new card to fill this pack</Typography>
              <Button variant="primary">Add New Card</Button>
            </div>
          ) : (
            <div>
              <Typography variant="large">{deck?.name}</Typography>
              <Typography>This pack is empty</Typography>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
