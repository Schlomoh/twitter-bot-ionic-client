import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = "http://[2a02:8108:4cbf:c4cc:f7f9:7fc9:ef58:5814]:5000";

interface IntervalData {
    break: {
        time: number;
        randomizeSpan: number;
    };
    work: {
        time: number;
        randomizeSpan: number;
    };
}

export const intervalsApi = createApi({
    reducerPath: "intervals",

    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
    }),

    endpoints: (builder) => ({
        getIntervals: builder.query<IntervalData, void>({
            query: () => "/intervals",
        }),

        setIntervals: builder.mutation<IntervalData, IntervalData>({
            query(body) {
                return {
                    url: "/intervals",
                    method: "POST",
                    body,
                };
            },
        }),
    }),
});

export const { useGetIntervalsQuery, useSetIntervalsMutation } = intervalsApi;
