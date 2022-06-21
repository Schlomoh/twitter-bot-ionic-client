import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = "http://[2a02:8108:4cbf:c4cc:f7f9:7fc9:ef58:5814]:5000/";

interface IntervalData {
    [key: string]: number;
    breakTime: number;
    breakVariation: number;
    workTime: number;
    workVariation: number;
}

export const intervalsApi = createApi({
    reducerPath: "intervals",
    tagTypes: ["Intervals"],

    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
    }),

    endpoints: (builder) => ({
        getIntervals: builder.query<IntervalData, void>({
            query: () => "/intervals",
            providesTags: ["Intervals"],
        }),

        setIntervals: builder.mutation<IntervalData, IntervalData>({
            query(body) {
                return {
                    url: "/intervals",
                    method: "POST",
                    body,
                };
            },
            invalidatesTags: ["Intervals"],
        }),
    }),
});

export const { useGetIntervalsQuery, useSetIntervalsMutation } = intervalsApi;
