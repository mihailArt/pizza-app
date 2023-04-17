import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiBack = createApi({
  reducerPath: 'apiBack',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3002/api' }),
  endpoints: (builder) => ({
    getFoodByCategory: builder.query({
      query: () => '/food/category'
    }),
    login: builder.mutation({
      query(post) {
        return {
          url: '/auth/login',
          method: 'POST',
          body: post
        };
      }
    }),
    register: builder.mutation({
      query(post) {
        return {
          url: '/auth/register',
          method: 'POST',
          body: post
        };
      }
    }),
    accessToken: builder.mutation({
      query(post) {
        return {
          url: '/auth/login/access-token',
          method: 'POST',
          body: post
        };
      }
    }),
    linkBasketToUser: builder.mutation({
      query(post) {
        return {
          url: '/auth/add-basket',
          method: 'POST',
          body: post
        };
      }
    }),
    getUserById: builder.query({
      query(id) {
        return {
          url: `/auth/user/${id}`,
          method: 'GET'
        };
      }
    })
  })
});

export const {
  useGetFoodByCategoryQuery,
  useLoginMutation,
  useLinkBasketToUserMutation,
  useGetUserByIdQuery
} = apiBack;
