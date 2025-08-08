import { createSlice } from "@reduxjs/toolkit";
import { IinterviewData } from "./type";

interface InterviewState {
    interviewData: IinterviewData | null;
}

const initialState: InterviewState = {
    interviewData: null,
};

const interviewSlice = createSlice({
    name: "interview",
    initialState,
    reducers: {
        setInterview: (state, action) => {
            state.interviewData = action.payload;
        },
    },
});

export const { setInterview } = interviewSlice.actions;
export default interviewSlice.reducer;
