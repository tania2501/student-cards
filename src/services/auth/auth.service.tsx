import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '../base-query-with-reauth'

import { LoginType, UserType } from './types'

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['Me'],
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getMe: builder.query<UserType | null, void>({
      query: () => 'auth/me',
      extraOptions: { maxRetries: false },
      providesTags: ['Me'],
    }),
    login: builder.mutation<LoginType, any>({
      query: data => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Me'],
    }),
    signUp: builder.mutation({
      query: body => ({
        url: 'auth/sign-up',
        method: 'POST',
        body,
      }),
    }),
    logOut: builder.mutation({
      query: data => ({
        url: 'auth/logout',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          authApi.util.updateQueryData('getMe', undefined, () => {
            return null
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
  }),
})

export const { useGetMeQuery, useLoginMutation, useSignUpMutation, useLogOutMutation } = authApi
