import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '../base-query-with-reauth'
import { Paginated } from '../decks/types'

import { Card, GetCardsParams } from './types'

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  tagTypes: ['Cards'],
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getCards: builder.query<Paginated<Card>, GetCardsParams>({
      query: params => {
        const { id, ...rest } = params

        return {
          url: `decks/${id}/cards`,
          params: rest ?? undefined,
        }
      },
      providesTags: ['Cards'],
    }),
  }),
})

export const { useGetCardsQuery } = cardsApi
