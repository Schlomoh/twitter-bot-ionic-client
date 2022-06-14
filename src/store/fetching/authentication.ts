import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://[2a02:8108:4cbf:c4cc:f7f9:7fc9:ef58:5814]:5000/";

export const authenticationApi = createApi({
    reducerPath: "authentication",

    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
    }),

    endpoints: (builder) => ({
        getIsAuthenticated: builder.query<{ isAuthenticated: boolean }, void>({
            query: () => ({
                url: "/isAuthenticated",
            }),
        }),

        getAuthLink: builder.query<{ url: string }, void>({
            query: () => ({
                url: "/getLink",
            }),
        }),
    }),
});

export const { useGetIsAuthenticatedQuery, useGetAuthLinkQuery } =
    authenticationApi;
