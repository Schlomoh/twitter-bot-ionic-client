import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = "http://[2a02:8108:4cbf:c4cc:f7f9:7fc9:ef58:5814]:5000";

interface InteractionsData {
    follows: number;
    likes: number;
    retweets: number;
    comments: number;
    randomVariation: number;
}

export const interactionsApi = createApi({
    reducerPath: "interactions",

    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
    }),

    endpoints: (builder) => ({
        getInteractions: builder.query<InteractionsData, void>({
            query: () => "/interactions",
        }),

        setInteractions: builder.mutation<InteractionsData, InteractionsData>({
            query(body) {
                return {
                    url: "/interactions",
                    method: "POST",
                    body,
                };
            },
        }),
    }),
});

export const { useGetInteractionsQuery, useSetInteractionsMutation } =
    interactionsApi;
