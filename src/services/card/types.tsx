export type Card = {
  id: string
  deckId: string
  userId: string
  question: string
  answer: string
  shots: number
  answerImg: any
  questionImg: any
  questionVideo: string
  answerVideo: string
  rating: number
  created: string
  updated: string
}

export type GetCardsParams = {
  id: string
  question?: string
  answer?: string
  orderBy?: string
  currentPage?: number
  itemsPerPage?: number
}

export type CreateCardArg = {
  data: FormData
  id: string
}
