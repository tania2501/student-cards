import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type InitialState = {
  searchByName: string
  currentPage: number
  itemsPerPage: string
  orderBy: string | null
  minCardsCount: number
  maxCardsCount: number
  authorId: string | undefined
}

export const deckSlice = createSlice({
  name: 'deckSlice',
  initialState: {
    searchByName: '',
    currentPage: 1,
    itemsPerPage: '10',
    orderBy: 'updated-desc',
    minCardsCount: 0,
    maxCardsCount: 100,
    authorId: undefined,
  } as InitialState,
  reducers: {
    setSearchByName: (state, action: PayloadAction<string>) => {
      state.searchByName = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setItemsPerPage: (state, action: PayloadAction<string>) => {
      state.itemsPerPage = action.payload
    },
    setOrderBy: (state, action: PayloadAction<string | null>) => {
      state.orderBy = action.payload
    },
    setMinCardsCount: (state, action: PayloadAction<number>) => {
      state.minCardsCount = action.payload
    },
    setMaxCardsCount: (state, action: PayloadAction<number>) => {
      state.maxCardsCount = action.payload
    },
    setAuthorId: (state, action: PayloadAction<string | undefined>) => {
      state.authorId = action.payload
    },
  },
})
