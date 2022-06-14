import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = "http://[2a02:8108:4cbf:c4cc:f7f9:7fc9:ef58:5814]:5000";

type Hashtags = string[];

export const hashtagApi = createApi({
    reducerPath: "hashtags",

    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
    }),
    tagTypes: ["Hashtags"],

    endpoints: (builder) => ({
        getHashtags: builder.query<Hashtags, void>({
            query: () => ({
                url: "/hashtags",
                responseHandler: async (response) =>
                    (await response.text())
                        .split(",")
                        .filter((s) => s !== "") || [],
            }),
            providesTags: ["Hashtags"],
        }),

        setHashtags: builder.mutation<string, string>({
            query: (body) => ({
                url: "/hashtags",
                method: "POST",
                body: { hashtags: body },
            }),
            invalidatesTags: ["Hashtags"],
        }),

        deleteHashtag: builder.mutation<Hashtags, string>({
            query: (h) => ({
                url: `/hashtags/${h}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Hashtags"],
        }),
    }),
});

export const {
    useGetHashtagsQuery,
    useSetHashtagsMutation,
    useDeleteHashtagMutation,
} = hashtagApi;
