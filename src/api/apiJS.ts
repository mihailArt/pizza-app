import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiJS = createApi({
  reducerPath: 'apiJS',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    getBasket: builder.query({
      query: (id) => `/basket/${id}`
    }),
    setBasket: builder.mutation({
      query(post) {
        return {
          url: '/basket',
          method: 'POST',
          body: post
        };
      }
    }),
    updateBasket: builder.mutation({
      query({ id, data }) {
        return {
          url: `/basket/${id}`,
          method: 'PUT',
          body: data
        };
      }
    }),
    deleteBasket: builder.mutation({
      query(id) {
        return {
          url: `/basket/${id}`,
          method: 'DELETE'
        };
      }
    }),
    saveOrder: builder.mutation({
      query(post) {
        return {
          url: '/orders',
          method: 'POST',
          body: post
        };
      }
    })
  })
});

export const {
  useGetBasketQuery,
  useSetBasketMutation,
  useUpdateBasketMutation,
  useSaveOrderMutation
} = apiJS;
