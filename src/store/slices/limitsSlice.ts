import { createSlice } from "@reduxjs/toolkit";

interface InteractionState {
    follows: number;
    likes: number;
    comments: number;
    retweets: number;
    variation: number;
}

interface IntervalState {
    workTime: number;
    workVariation: number;
    breakTime: number;
    breakVariation: number;
}

interface InitialState extends InteractionState, IntervalState {
    [key: string]: any;
}

const initialState = {
    follows: 0,
    likes: 0,
    comments: 0,
    retweets: 0,
    variation: 0,
    workTime: 0,
    workVariation: 0,
    breakTime: 0,
    breakVariation: 0,
} as InitialState;

const limitsSlice = createSlice({
    name: "limits",
    initialState: initialState,
    reducers: {
        setLimitsState: (state, action: {type: string, payload: typeof initialState}) => {
           return state = action.payload;
        },
    },
});

export default limitsSlice;
export const { setLimitsState } = limitsSlice.actions;
