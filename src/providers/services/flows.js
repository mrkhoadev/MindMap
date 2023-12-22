import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const flows = createApi({
  reducerPath: "flows",
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_MY_SERVER_API,
  }),
  tagTypes: ["mindmap"],
  endpoints: (builder) => ({
    getUserEmail: builder.query({
        query: (email) => `/users?userEmail=${email}`,
        providesTags: (result, error) => {
            if (result) {
              const data = [
                ...result.map(({ id }) => ({ type: "mindmap", id })), 
                { type: "mindmap", id: "LIST" },
              ];
              return data;
            }
            return [{...error, type: 'mindmap'}]
        },
      }),
    createUserData: builder.mutation({
        query: (email) => {
          return {
            url: `/users`,
            method: "POST",
            body: {
                userEmail: email
            },
          };
        },
        invalidatesTags: [{ type: "mindmap", id: "LIST" }],
      }),
    getMindMap: builder.query({
        query: () => `/mindmap`,
        providesTags: (result, error) => {
            if (result)
            {
              const data = [
                ...result.map(({ id }) => ({ type: "mindmap", id })),
                { type: "mindmap", id: "LIST" },
              ];
              return data;
            }
            return [{...error, type: 'mindmap'}]
        },
      }),
    postMindMap: builder.mutation({
      query: (data) => {
        return {
          url: `/mindmap`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [{ type: "mindmap", id: "LIST" }],
      }),
    deleteMindMap: builder.mutation({
        query: (id) => {
          return {
            url: `/mindmap/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: [{ type: "mindmap", id: "LIST" }],
      }),
    deleteSelectedMindMap: builder.mutation({
        query: (id) => {
          return {
            url: `/mindmap`,
            method: "DELETE",
            body: {
              id
            }
          };
        },
        invalidatesTags: [{ type: "mindmap", id: "LIST" }],
      }),
    getMindMapDetails: builder.query({
      query: (mindMapId) => `/mindmap?mindMapId=${mindMapId}`,
      providesTags: (result, error) => {
          if (result)
          {
            const data = [
              ...result.map(({ id }) => ({ type: "mindmap", id })),
              { type: "mindmap", id: "LIST" },
            ];
            return data;
          }
          return [{...error, type: 'mindmap'}]
      },
    }),


      editFlowData: builder.mutation({
        query: (data) => {
          return {
            url: `/mindmap/${data.id}`,
            method: "PATCH",
            body: {...data},
          };
        },
        invalidatesTags: [{ type: "mindmap", id: "LIST" }],
      }),
  }),
});
