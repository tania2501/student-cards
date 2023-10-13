import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '../base-query-with-reauth'
import { Paginated } from '../decks/types'

import { Card, CreateCardArg, GetCardsParams } from './types'

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
    createCard: builder.mutation<any, CreateCardArg>({
      query: params => {
        const { id, data } = params

        return {
          url: `decks/${id}/cards`,
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['Cards'],
    }),
    deleteCard: builder.mutation<any, CreateCardArg>({
      query: params => {
        const { id, data } = params

        return {
          url: `decks/${id}/cards`,
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['Cards'],
    }),
  }),
})

export const { useGetCardsQuery, useCreateCardMutation } = cardsApi
