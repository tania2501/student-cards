import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { LoginType, UserType } from './types'

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['Me'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API_URL,
    credentials: 'include',
  }),
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
  }),
})

export const { useGetMeQuery, useLoginMutation, useSignUpMutation } = authApi
