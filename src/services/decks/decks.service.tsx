import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '../base-query-with-reauth'

import { Paginated, Deck, PaginatedArgs, GetDecksParams, CreateDeckInput } from './types'

export const decksApi = createApi({
  reducerPath: 'decksApi',
  tagTypes: ['Decks'],
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getDecks: builder.query<
      Paginated<Deck> & { maxCardsCount: number },
      PaginatedArgs<GetDecksParams>
    >({
      query: params => {
        return {
          url: 'decks',
          params: params ?? undefined,
        }
      },
      providesTags: ['Decks'],
    }),
    createDecks: builder.mutation<Deck, CreateDeckInput>({
      query: data => ({
        url: 'decks',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})
export const { useGetDecksQuery, useCreateDecksMutation } = decksApi
