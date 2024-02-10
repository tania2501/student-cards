import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { authApi } from './auth/auth.service'
import { deckSlice } from './decks/deck.slice'
import { decksApi } from './decks/decks.service'

export const store = configureStore({
  reducer: {
    [decksApi.reducerPath]: decksApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [deckSlice.name]: deckSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(decksApi.middleware).concat(authApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
