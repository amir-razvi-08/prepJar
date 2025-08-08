import { createSlice } from "@reduxjs/toolkit";

 interface IUser {
  id: string;
  email: string;
  name?: string;
  image?: string;
}

interface UserState {
  user: IUser | null;
}


const initialState:UserState = {
    user: null,
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;