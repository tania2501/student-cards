import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '../base-query-with-reauth'
import { Card, CreateCardArg, GetCardsParams } from '../card/types'
import { RootState } from '../store'

import {
  Paginated,
  Deck,
  PaginatedArgs,
  GetDecksParams,
  CreateDeckInput,
  UpdateDecks,
  LearnDeckArgs,
  SaveGradeArgs,
} from './types'

export const decksApi = createApi({
  reducerPath: 'decksApi',
  tagTypes: ['Decks', 'Cards', 'Deck', 'Card'],
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
    getDecksById: builder.query<Deck, { id: string }>({
      query: params => {
        const { id, ...rest } = params

        return {
          url: `decks/${id}`,
          params: rest ?? undefined,
        }
      },
      providesTags: ['Deck'],
    }),
    createDecks: builder.mutation<Deck, CreateDeckInput>({
      query: data => ({
        url: 'decks',
        method: 'POST',
        body: data,
      }),
      onQueryStarted: async (_, { getState, queryFulfilled, dispatch }) => {
        const state = getState() as RootState
        const {
          searchByName,
          currentPage,
          itemsPerPage,
          maxCardsCount,
          minCardsCount,
          orderBy,
          authorId,
        } = state.deckSlice

        try {
          const result = await queryFulfilled

          dispatch(
            decksApi.util.updateQueryData(
              'getDecks',
              {
                currentPage,
                name: searchByName,
                itemsPerPage: +itemsPerPage,
                maxCardsCount,
                minCardsCount,
                orderBy,
                authorId,
              },
              draft => {
                draft.items.unshift(result.data)
              }
            )
          )
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e)
        }
      },

      invalidatesTags: ['Decks'],
    }),
    deleteDecks: builder.mutation<Deck, { id: string }>({
      query: data => {
        const { id } = data

        return {
          url: `decks/${id}`,
          method: 'DELETE',
        }
      },
      onQueryStarted: async ({ id }, { getState, dispatch, queryFulfilled }) => {
        const state = getState() as RootState
        const {
          searchByName,
          currentPage,
          itemsPerPage,
          maxCardsCount,
          minCardsCount,
          orderBy,
          authorId,
        } = state.deckSlice
        const patchResult = dispatch(
          decksApi.util.updateQueryData(
            'getDecks',
            {
              currentPage,
              name: searchByName,
              orderBy,
              itemsPerPage: +itemsPerPage,
              maxCardsCount,
              minCardsCount,
              authorId,
            },
            draft => {
              draft.items.splice(
                draft.items.findIndex(deck => deck.id === id),
                1
              )
            }
          )
        )

        try {
          await queryFulfilled
        } catch (e) {
          patchResult.undo()
        }
      },
      invalidatesTags: ['Decks'],
    }),
    learnDeck: builder.query<Card, LearnDeckArgs>({
      query: params => {
        const { id, ...data } = params

        return {
          url: `decks/${id}/learn`,
          params: data ?? undefined,
        }
      },
    }),
    saveGradeOfCard: builder.mutation<void, SaveGradeArgs>({
      query: body => {
        const { id, ...data } = body

        return {
          url: `decks/${id}/learn`,
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['Cards'],
    }),
    updateDecks: builder.mutation<Deck, UpdateDecks>({
      query: body => {
        const { id, data } = body

        return {
          url: `decks/${id}`,
          method: 'PATCH',
          body: data,
        }
      },
      invalidatesTags: ['Decks'],
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
      invalidatesTags: ['Cards', 'Deck', 'Decks'],
    }),
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
    getCardsById: builder.query<Card, { id: string }>({
      query: params => {
        const { id, ...rest } = params

        return {
          url: `cards/${id}`,
          params: rest ?? undefined,
        }
      },
      providesTags: ['Cards'],
    }),
    deleteCard: builder.mutation<any, { id: string }>({
      query: params => {
        const { id } = params

        return {
          url: `cards/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Cards', 'Deck', 'Decks'],
    }),
    updateCard: builder.mutation<any, CreateCardArg>({
      query: params => {
        const { id, data } = params

        return {
          url: `cards/${id}`,
          method: 'PATCH',
          body: data,
        }
      },
      invalidatesTags: ['Cards'],
    }),
  }),
})

export const {
  useGetDecksQuery,
  useCreateDecksMutation,
  useDeleteDecksMutation,
  useUpdateDecksMutation,
  useGetDecksByIdQuery,
  useCreateCardMutation,
  useDeleteCardMutation,
  useGetCardsByIdQuery,
  useGetCardsQuery,
  useUpdateCardMutation,
  useLearnDeckQuery,
  useSaveGradeOfCardMutation,
} = decksApi
