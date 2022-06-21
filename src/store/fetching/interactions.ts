import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = "http://[2a02:8108:4cbf:c4cc:f7f9:7fc9:ef58:5814]:5000/";

interface InteractionsData {
    [key: string]: number;
    tweets: number;
    retweets: number;
    comments: number;
    likes: number;
    follows: number;
    variation: number;
}

export const interactionsApi = createApi({
    reducerPath: "interactions",
    tagTypes: ["Interactions"],

    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
    }),

    endpoints: (builder) => ({
        getInteractions: builder.query<InteractionsData, void>({
            query: () => "/interactions",
            providesTags: ["Interactions"],
        }),

        setInteractions: builder.mutation<InteractionsData, InteractionsData>({
            query: (body) => ({
                url: "/interactions",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Interactions"],
        }),
    }),
});

export const { useGetInteractionsQuery, useSetInteractionsMutation } =
    interactionsApi;
