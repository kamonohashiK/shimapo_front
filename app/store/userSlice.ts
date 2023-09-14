// redux-toolkitを試しに使ってみる
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  uid: string;
  displayName: string;
  photoUrl: string;
}

const initialState: UserState = {
  uid: "",
  displayName: "",
  photoUrl: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
});

export const { } = userSlice.actions;

export default userSlice.reducer;
