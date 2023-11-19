import { UserType } from '../auth/types'

export type GetDecksParams = {
  authorId?: string
  name?: string
  minCardsCount?: number
  maxCardsCount?: number
}

export type Decks = Deck[]

export type DeckAuthor = Pick<UserType, 'id' | 'name'> // { id: string, name: string }

export type Deck = {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover?: any
  rating: number
  isDeleted?: any
  isBlocked?: any
  created: string
  updated: string
  author: DeckAuthor
  cardsCount: number
}

export type CreateDeckInput = FormData
export type DeleteDeckInput = { deckId: Deck['id'] }
// { deckId: string }
export type UpdateDecks = {
  data: FormData
  id: string
}
export type Pagination = {
  totalPages: number
  currentPage: number
  itemsPerPage: number
  totalItems: number
}

export type Paginated<T> = {
  pagination: Pagination
  items: T[]
  maxCardsCount: number
}

export type PaginatedArgs<T extends Record<string, any> = {}> = {
  currentPage?: number
  itemsPerPage?: number
  pageSize?: number
  orderBy?: string | null
} & T

export type LearnDeckArgs = {
  id: string
  previousCardId?: string
}

export type SaveGradeArgs = {
  id: string
  cardId: string
  grade: number
}
