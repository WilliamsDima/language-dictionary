import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: fetchBaseQuery(),
  reducerPath: 'baseApi',
  tagTypes: ['user'],
  endpoints: (builder) => ({}),
})
