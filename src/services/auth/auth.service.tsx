import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '../base-query-with-reauth'

import { LoginResponse, LoginType, RecoverPassword, ResetPassword, UserType } from './types'

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
    login: builder.mutation<LoginResponse, LoginType>({
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
    changeName: builder.mutation<UserType, FormData>({
      query: data => ({
        url: 'auth/me',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Me'],
    }),
    forgotPassword: builder.mutation<void, RecoverPassword>({
      query: data => ({
        url: 'auth/recover-password',
        method: 'POST',
        body: {
          ...data,
          html: message,
        },
      }),
    }),
    resetPassword: builder.mutation<void, ResetPassword>({
      query: data => {
        const { token, password } = data

        return {
          url: `auth/reset-password/${token}`,
          method: 'POST',
          body: { password },
        }
      },
    }),
    logOut: builder.mutation<any, void>({
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
const message =
  '<h1>Hi, ##name##</h1><p>Click <a href="http://localhost:5173/set-new-password/##token##">here</a> to recover your password</p>'

export const {
  useGetMeQuery,
  useLoginMutation,
  useSignUpMutation,
  useLogOutMutation,
  useChangeNameMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi
