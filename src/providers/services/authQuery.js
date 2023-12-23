import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const auth = createApi({
  reducerPath: "auth",
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_API,
  }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => {
        return {
          url: `/auth/login`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    register: builder.mutation({
      query: (data) => {
        return {
          url: `/auth/register`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
  }),
});
