import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type TAuthState = {
  user: {
    id: string;
    role: string;
  } | null;
  token: string | null;
};

const initialState: TAuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // login
    logIn: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },

    // logout
    logOut: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export default authSlice.reducer;
export const { logIn, logOut } = authSlice.actions;

// selector
export const selectToken = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state.auth.user;
