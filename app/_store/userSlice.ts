import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  loggedIn: boolean;
  displayName: string;
  photoUrl: string;
}

const initialState: UserState = {
  loggedIn: false,
  displayName: "",
  photoUrl: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginInfo: (state, action: PayloadAction<UserState>) => {
      state.loggedIn = false;
      state.displayName = action.payload.displayName;
      state.photoUrl = action.payload.photoUrl;
    },
    unmountLoginInfo: (state) => {
      state.loggedIn = false;
      state.displayName = "";
      state.photoUrl = "";
    }
  },
});

export const { setLoginInfo, unmountLoginInfo } = userSlice.actions;

export default userSlice.reducer;
