import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { SvgImgIcon } from '../../assets/icons/img-icon'
import { SvgDelete, SvgEdit, SvgPlay } from '../../assets/icons/menu-icons'
import { Button } from '../../components/ui/button'
import { ControlledCheckbox } from '../../components/ui/controlled/controlled-checkbox/controlled-checkbox'
import { ControlledInput } from '../../components/ui/controlled/controlled-checkbox/controlled-input'
import { Input } from '../../components/ui/input'
import { Modal } from '../../components/ui/modal/modal'
import { Pagination } from '../../components/ui/pagination'
import { MainSelect } from '../../components/ui/select'
import { MainSlider } from '../../components/ui/slider'
import { Column, Sort, Table } from '../../components/ui/table'
import { CardsTabs } from '../../components/ui/tabs'
import { Typography } from '../../components/ui/typography'
import { useGetMeQuery } from '../../services/auth/auth.service'
import { useCreateDecksMutation, useGetDecksQuery } from '../../services/decks/decks.service'

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

  const [createDeck] = useCreateDecksMutation()
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
  const MAX_FILE_SIZE = 500000
  const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

  const schema = z.object({
    name: z.string().min(3, { message: 'Must be exactly 3 characters long' }),
    isPrivate: z.boolean().default(false),
    cover: z
      .instanceof(File)
      .refine(file => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
      .refine(
        file => file && ACCEPTED_IMAGE_TYPES.includes(file.type),
        'Only .jpg, .jpeg, .png and .webp formats are supported.'
      )
      .optional(),
  })

  type CreateDeckFormData = z.infer<typeof schema>

  const { control, handleSubmit } = useForm<CreateDeckFormData>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      isPrivate: false,
      cover: undefined,
    },
  })
  const onChange = handleSubmit((data: CreateDeckFormData) => {
    const imgFile = new FormData()

    data.cover && imgFile.append('cover', data.cover)
    imgFile.append('name', data.name)
    imgFile.append('isPrivate', JSON.stringify(data.isPrivate))

    createDeck(imgFile)
    setShowModal(false)
  })

  return (
    <div>
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <form onSubmit={onChange} className={s.form}>
            <div>
              <ControlledInput
                required={false}
                name="cover"
                control={control}
                type="file"
                id="file-cover"
                style={{ display: 'none' }}
              />
              <Button
                as={'label'}
                variant="secondary"
                fullWidth
                htmlFor="file-cover"
                className={s.fileButton}
              >
                <SvgImgIcon /> Add Cover Image
              </Button>
            </div>
            <ControlledInput
              control={control}
              name={'name'}
              id="packs-name"
              label="Name pack"
              placeholder="Name"
            />
            <ControlledCheckbox label="Private pack" name="isPrivate" control={control} />
            <div className={s.modalButton}>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Add New Pack
              </Button>
            </div>
          </form>
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
