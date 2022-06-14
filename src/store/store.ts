import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { authenticationApi, hashtagApi, intervalsApi } from "./fetching";
import { interactionsApi } from "./fetching/interactions";
import limitsSlice from "./slices/limitsSlice";

const store = configureStore({
    reducer: {
        [authenticationApi.reducerPath]: authenticationApi.reducer,
        [hashtagApi.reducerPath]: hashtagApi.reducer,
        [intervalsApi.reducerPath]: intervalsApi.reducer,
        [interactionsApi.reducerPath]: interactionsApi.reducer,
        [limitsSlice.name]: limitsSlice.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authenticationApi.middleware,
            hashtagApi.middleware,
            intervalsApi.middleware,
            interactionsApi.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export const useTSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
