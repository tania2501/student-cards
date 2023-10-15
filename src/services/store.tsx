import { configureStore } from '@reduxjs/toolkit'

import { authApi } from './auth/auth.service'
import { decksApi } from './decks/decks.service'

export const store = configureStore({
  reducer: {
    [decksApi.reducerPath]: decksApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(decksApi.middleware).concat(authApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
