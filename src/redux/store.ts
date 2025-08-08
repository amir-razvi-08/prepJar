import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import interviewReducer from "./features/interviewSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        interview: interviewReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
