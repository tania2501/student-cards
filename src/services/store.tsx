import { configureStore } from '@reduxjs/toolkit'

import { authApi } from './auth/auth.service'
import { cardsApi } from './card/card.service'
import { decksApi } from './decks/decks.service'

export const store = configureStore({
  reducer: {
    [decksApi.reducerPath]: decksApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [cardsApi.reducerPath]: cardsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(decksApi.middleware)
      .concat(authApi.middleware)
      .concat(cardsApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
